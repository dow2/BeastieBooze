import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const ImgUploads = ({ uploadedImg }) => {
  const { caption, username, googleImgUrl, imageUrl } = uploadedImg;

  const subhead = `Photo taken by ${username}`;

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} >
        <CardHeader 
          avatar={
            <Avatar alt={username} src={googleImgUrl} />
          }
          title={caption}
          subheader={subhead}
        />
        <CardMedia 
          component="img"
          height="194"
          image={imageUrl}
          alt={caption}
        />
      </Card>
    </div>
  )
};

export default ImgUploads;