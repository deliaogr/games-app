import React, { useState } from "react";

import "./EditItemForm.styles.scss";

const EditItemForm = ({ item, onSave }) => {
  const [formState, setFormState] = useState(item);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSave = (item) => {
    const updatedItem = {
      title: formState.title,
      developer: formState.developer,
      thumbnail: formState.thumbnail,
      genre: formState.genre,
      platform: formState.platform,
      release_date: formState.release_date,
      short_description: formState.short_description,
      price: formState.price,
    };
    onSave({ id: item.id, updatedItem });
  };

  return (
    <form className="Form">
      <label>Title: </label>
      <input type="text" name="title" id="title" defaultValue={item.title} />
      <label>Description: </label>
      <textarea
        type="text"
        name="description"
        id="description"
        defaultValue={item.short_description}
        onChange={handleChange}
      />
      <label>Thumbnail URL: </label>
      <input
        type="text"
        name="thumbnail"
        id="thumbnail"
        defaultValue={item.thumbnail}
        onChange={handleChange}
        required
      />
      <label>Genre: </label>
      <input
        type="text"
        name="genre"
        id="genre"
        defaultValue={item.genre}
        onChange={handleChange}
      />
      <label>Platform: </label>
      <input
        type="text"
        name="platform"
        id="platform"
        defaultValue={item.platform}
        onChange={handleChange}
      />
      <label>Developer: </label>
      <input
        type="text"
        name="developer"
        id="developer"
        defaultValue={item.developer}
        onChange={handleChange}
      />
      <label>Release Date: </label>
      <input
        type="date"
        name="release_date"
        id="release_date"
        defaultValue={item.release_date}
        onChange={handleChange}
      />
      <label>Price: </label>
      <input
        type="text"
        name="price"
        id="price"
        defaultValue={item.price}
        onChange={handleChange}
      />
      <button
        type="button"
        className="Save Button"
        onClick={() => handleSave(item)}
      >
        Save
      </button>
    </form>
  );
};

export default EditItemForm;
