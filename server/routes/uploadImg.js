const { Router } = require("express");
const multer = require('multer');
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../s3.js');
const crypto = require('crypto');
const sharp = require('sharp');
const { ImgUpload } = require('../database/Models.js');



const uploadImgRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

uploadImgRouter.get('/', (req, res) => {
  ImgUpload.find({})
    .then((uploads) => {
      res.status(200).send(uploads);
      // for (let upload of uploads) {
      //   getObjectSignedUrl(upload.imageName)
      //     .then((url) => {
      //       ImgUpload.findOneAndUpdate({ _id: upload._id }, { imageUrl: url })
      //         .catch((err) => {
      //           console.error(err);
      //         })
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     })
      // }
    })
    // .then(() => {
    //   ImgUpload.find({})
    //     .then((uploads) => {
    //       res.status(200).send(uploads);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     })
    // })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
})

uploadImgRouter.post('/', upload.single('image'), (req, res) => {
  const { file } = req;
  const { caption, googleId, googleImgUrl, name } = req.body;
  const imageName = generateFileName();
  const uploadedImg = {
    imageName,
    imageUrl: '',
    caption,
    username: name,
    googleImgUrl,
    googleId
  };

  

  // uploads to s3 bucket
  uploadFile(file.buffer, imageName, file.mimetype)
    .then(() => {
      console.log('Successful! Image uploaded to S3 Bucket');
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });


  // saves to mongodb cloud atlas datbase
  getObjectSignedUrl(imageName)
    .then((url) => {
      uploadedImg.imageUrl = url;
      const newImgUpload = new ImgUpload(uploadedImg);
      return newImgUpload;
    })
    .then((newImgUpload) => {
      ImgUpload.findOne({ 'imageName': `${imageName}` })
        .then(result => {
          if (!result) {
            newImgUpload.save()
              .then(() => {
                console.log('Successful! Image uploaded to database');
                res.sendStatus(201);
              })
              .catch(err => {
                console.error(err);
              })
          }
        })
        .catch(() => {
          console.log('Uploaded image already exists');
          res.sendStatus(500);
        });
    })
});

module.exports = { uploadImgRouter };