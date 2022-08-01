import React, { useContext } from 'react';
import { BoozeContext } from '../boozeContext';
import { useForm } from 'react-hook-form';

const EventCreation = () => {
  const { createEvent } = useContext(BoozeContext);

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data, e) => {
    //separate drink ingredients into something more reasonable

    //send data for axios calls
    createEvent(data);
    e.target.reset();
  };

  return (
    <div className='form-group'>
      <h1 className='page-heading' style={{ paddingBottom: '0px' }}>
        Create an Event
      </h1>
      <form className='input-form ' onSubmit={handleSubmit(onSubmit)}>
        <h4 className='create-form-heading'>Event Title</h4>
        <input className='form-control' {...register('eventName')} />
        <h4 className='create-form-heading'>Date</h4>

        <input
          className='form-control'
          {...register('date')}
          placeholder={`ex: xx-xx-xxxx`}
        />
        <h4 className='create-form-heading'>Location</h4>
        <input className='form-control' {...register('location')} />
        <h4 className='create-form-heading'>Description</h4>
        <textarea
          className='form-control'
          rows='3'
          {...register('description')}
          placeholder={`Example Description: `}
        />
        <select className='form-control' {...register('eventType')}>
          <option value={'Personal Event'}>Personal</option>
          <option value={'Business Event'}>Business</option>
        </select>
        <div className='create-button'>
          <button className='btn btn-dark' type='submit'>
            {' '}
            Submit{' '}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreation;
