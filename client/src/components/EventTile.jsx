import React, { useContext } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  TwitterIcon,
} from 'react-share';
import { BoozeContext } from '../boozeContext';

const EventTile = ({ event }) => {
  const { title, description, date, location, eventType, _id } = event;
  const { removeEvent } = useContext(BoozeContext);
  return (
    <div className='card bg-dark justify-content-center col-md-3 m-1'>
      <div className='card-body text-white'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
        <p className='card-text'>{date}</p>
        <p className='card-text'>{location}</p>
        <p className='card-text'>{eventType}</p>
      </div>
      <div>
        <TwitterShareButton
          url='link'
          title='Check out this Event on BeastieBooze'
          hashtag={'#BeastieBooze'}
          className='twitter-button'
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <EmailShareButton>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <FacebookShareButton />

        <button
          type='button'
          className='btn btn-danger'
          onClick={() => removeEvent(_id)}
        >
          Delete Event
        </button>
      </div>
    </div>
  );
};
export default EventTile;
