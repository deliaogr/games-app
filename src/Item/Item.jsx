import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editItem, deleteItem } from '../redux/listSlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
import EditItemForm from '../EditItemForm/EditItemForm';
import {
  fetchList,
  selectListItem,
  selectListStatus,
} from '../redux/listSlice';
import './Item.styles.scss';

const Item = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { itemId } = params;
  const [showForm, setShowForm] = useState(false);

  const listStatus = useSelector(selectListStatus);
  useEffect(() => {
    if (listStatus === 'idle') {
      dispatch(fetchList());
    }
  }, [listStatus, dispatch]);

  const item = useSelector((state) => selectListItem(state, itemId));

  if (!item) {
    return (
      <div className='Container'>
        <div className='GameNotFoundMessage'>
          Game not found! <br /> Go to{' '}
          <Link to='/' className='Link'>
            Games
          </Link>
          .
        </div>
      </div>
    );
  }

  const updateItem = (updatedItem) => {
    dispatch(editItem(updatedItem));
    setShowForm(false);
  };

  return (
    <div className='Container'>
      <div className='TitleAndAction'>
        <div className='Link' onClick={() => navigate(-1)}>
          Back
        </div>
        <h1 className='Title'>{item.title}</h1>
      </div>
      <img src={item.thumbnail} className='Image' alt='Thumbnail' />
      {showForm ? (
        <EditItemForm item={item} onSave={updateItem} />
      ) : (
        <div className='Details'>
          <div className='Description'>{item.short_description}</div>
          <div>Genre: {item.genre}</div>
          <div>Platform: {item.platform}</div>
          <div>Developer: {item.developer}</div>
          <div>Release Date: {item.release_date}</div>
          <div className='Price'>Price: ${item.price}</div>
          <div className='Buttons'>
            <button
              className='EditItem Button'
              onClick={() => setShowForm(true)}
            >
              Edit game
            </button>
            <button
              className='DeleteItem Button'
              onClick={() => dispatch(deleteItem(item))}
            >
              Delete game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
