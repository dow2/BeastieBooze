// navbar will contain logo on the far left, signup/login or logout/username(profile view) buttons on the far right
// buttons to switch to either custom drinks page or the main feed

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Login from './Login.jsx';
import axios from 'axios';

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { UserContext } from '../userContext.jsx';

import { UserContext } from '../userContext'



const Navbar = () => {

  //* links to endpoints that will be handled by Routes in App component
  const { userInfo, isLoggedIn, loginInfo } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const { username } = userInfo;
  const {googleId, imageUrl, name } = loginInfo;
  //state to hold collapsing navbar
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => {
    return setIsNavCollapsed(!isNavCollapsed);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("googleId", googleId);
    formData.append("googleImgUrl", imageUrl);
    formData.append("name", name);

    axios.post('/routes/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
      .then(() => {
        console.log('Image uploaded');
      })
      .catch(err => {
        console.log(err);
      });

      setCaption('');
  }

  const fileSelected = e => {
    const file = e.target.files[0];

    setFile(file);
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

      <Link to="/" className="navbar-brand">
        <img src="images/beastieBoozeLogo.png"></img>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarTogglerDemo02" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/search" className="nav-link">Search</Link>
          </li>
          <li className="nav-item">
            <Link to="/custom" className="nav-link">Custom</Link>
          </li>
          <li className="nav-item">
            <Link to="/map" className="nav-link">Find My Booze</Link>
          </li>
          {isLoggedIn ?
            <li className="nav-item">
              <Link to="/create" className="nav-link">Submit</Link>
            </li>
            : null
          }
        </ul>
        <li>
          <div>
            <Button className="add-image">
              <AddPhotoAlternateOutlinedIcon onClick={handleClickOpen}></AddPhotoAlternateOutlinedIcon>
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Booze Image Uploader</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Show us what you are currently drinking at your favorite bars.
                </DialogContentText>
              </DialogContent>
              <div>
                <form onSubmit={submit}>
                  <input id="choose-file" type="file" onChange={fileSelected} accept="image/*" />
                  <br />
                  <TextField value={caption} id="caption-input" label="Name of Drink" variant="outlined" onChange={e => setCaption(e.target.value)} type="text" />
                  {/* <input id="caption-input" value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Name of Drink'></input> */}
                  <DialogActions>
                    <Button type="submit">Upload</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </DialogActions>
                </form>
              </div>
            </Dialog>
          </div>
        </li>
        {username ?
          <li className="nav-item">
            <Link to={`/profile/${userInfo.googleId}`}>
              <p className="nav-item grey" id="welcome">
                Welcome, {username}!&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </Link>
          </li>
          : null
        }
        <li className="nav-item login-nav">
          <div className="nav-link btn-nav" style={{ padding: '10px 0px 0px 0px' }}>
            <Login />
          </div>
        </li>
      </div>
    </nav>
  )
};

export default Navbar;
