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
    .then(uploads => {
      uploads.forEach(upload => {
        upload.imageUrl = getObjectSignedUrl(upload.imageName);
      })
      res.status(200).send(uploads);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

uploadImgRouter.post('/', upload.single('image'), (req, res) => {
  const { file } = req;
  const { caption, googleId, imageUrl, name } = req.body;
  const imageName = generateFileName();
  const uploadedImg = {
    imageName,
    caption,
    username: name,
    imageUrl,
    googleId
  };
  const newImgUpload = new ImgUpload(uploadedImg);

  // uploads to s3 bucket
  uploadFile(file.buffer, imageName, file.mimetype)
    .then(() => {
      console.log('Uploaded image posted to s3 bucket');
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });


  // saves to mongodb cloud atlas datbase
  ImgUpload.findOne({ 'imageName': `${imageName}` })
    .then(result => {
      if (!result) {
        newImgUpload.save()
          .then(() => {
            console.log('Uploaded image saved to database');
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

});

module.exports = { uploadImgRouter };