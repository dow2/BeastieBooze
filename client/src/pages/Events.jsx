import React, { useContext, useEffect } from 'react';
import { BoozeContext } from '../boozeContext';
import EventTile from '../components/EventTile';

const Events = () => {
  const { events, getEvents } = useContext(BoozeContext);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className='container'>
      <h1 className='page-heading'>Events</h1>
      <div className='row d-flex justify-content-center'>
        {events.map((event, i) => {
          //selects an image address for randomizing drink images
          return <EventTile event={event} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Events;
