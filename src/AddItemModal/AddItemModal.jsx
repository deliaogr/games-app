import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/listSlice';

import './AddItemModal.styles.scss';

const AddItemModal = ({ closeModal }) => {
  const [item, setItem] = useState({
    id: nanoid(),
    title: '',
    developer: '',
    thumbnail: '',
    genre: '',
    platform: '',
    release_date: '',
    short_description: '',
    price: 1,
    quantity: 1,
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(item));
    closeModal();
  };

  return (
    <div className='Modal'>
      <div className='CloseModal' onClick={closeModal}>
        &#10006;
      </div>
      <h1 className='Title'>Add new game</h1>
      <form className='Form' onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type='text'
          name='title'
          id='title'
          value={item.title}
          onChange={handleChange}
          required
        />
        <label>Description: </label>
        <textarea
          type='text'
          name='short_description'
          id='short_description'
          value={item.short_description}
          onChange={handleChange}
          required
        />
        <label>Thumbnail URL: </label>
        <input
          type='url'
          name='thumbnail'
          id='thumbnail'
          value={item.thumbnail}
          onChange={handleChange}
          required
        />
        <label>Genre: </label>
        <input
          type='text'
          name='genre'
          id='genre'
          value={item.genre}
          onChange={handleChange}
          required
        />
        <label>Platform: </label>
        <input
          type='text'
          name='platform'
          id='platform'
          value={item.platform}
          onChange={handleChange}
          required
        />
        <label>Developer: </label>
        <input
          type='text'
          name='developer'
          id='developer'
          value={item.developer}
          onChange={handleChange}
          required
        />
        <label>Release Date: </label>
        <input
          type='date'
          name='release_date'
          id='release_date'
          value={item.release_date}
          onChange={handleChange}
          required
        />
        <label>Price: </label>
        <input
          type='number'
          name='price'
          id='price'
          value={item.price}
          onChange={handleChange}
          required
        />
        <button type='submit' className='Save Button'>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddItemModal;
