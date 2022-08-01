import React, { useState, createContext } from 'react';
import axios from 'axios';

const ImgUploadContext = createContext();

const ImgUploadContextProvider = ({ children }) => {
  const [uploadedImgs, setUploadedImgs] = useState([]);

  const getUploadedImgs = () => {
    axios.get('/routes/images')
      .then(({ data }) => {
        setUploadedImgs(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const imgUploadProps = {
    getUploadedImgs,
    uploadedImgs
  };

  return (
    <ImgUploadContext.Provider value={imgUploadProps}>{children}</ImgUploadContext.Provider>
  );
}

export { ImgUploadContextProvider, ImgUploadContext };
