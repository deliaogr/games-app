import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { fetchList, selectListStatus, selectList } from "../redux/listSlice";
import { Link } from "react-router-dom";
import "./List.styles.scss";
import AddItemModal from "../AddItemModal/AddItemModal";

const List = () => {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Add to cart");
  const [showAddedToCart, setShowAddedToCart] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const listStatus = useSelector(selectListStatus);
  const list = useSelector(selectList);

  useEffect(() => {
    if (listStatus === "idle") {
      dispatch(fetchList());
    }
  }, [listStatus, dispatch]);

  const addToCart = (item, index) => {
    dispatch(addItem(item));
    setButtonText("Added to cart!");
    setShowAddedToCart(index);
    setTimeout(() => setButtonText("Add to cart"), 2000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="Container">
        <h1 className="Title">Games</h1>
        <div className="GamesList">
          {list?.items &&
            list.items.map((listItem, index) => {
              return (
                <div key={listItem.id} className="ListItem">
                  <div className="FirstRow">
                    <div className="Index">{index + 1}.</div>
                    <img
                      src={listItem.thumbnail}
                      className="Thumbnail"
                      alt="thumbnail"
                    />
                    <div className="ItemName">
                      <Link to={`/game/${listItem.id}`} className="Link">
                        {listItem.title}
                      </Link>
                      <button
                        className="Button"
                        onClick={() => addToCart(listItem, index)}
                      >
                        {showAddedToCart === index ? buttonText : "Add to cart"}
                      </button>
                    </div>
                  </div>
                  <div className="SecondRow">${listItem.price}</div>
                </div>
              );
            })}
        </div>
        <button className="AddItem Button" onClick={() => setShowModal(true)}>
          Add game
        </button>
      </div>
      {showModal ? (
        <>
          <AddItemModal closeModal={closeModal} />
          <div className="Backdrop" onClick={() => setShowModal(false)}></div>
        </>
      ) : null}
    </>
  );
};

export default List;
