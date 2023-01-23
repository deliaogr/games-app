import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import "./List.styles.scss";

const List = ({ list }) => {
  const dispatch = useDispatch();

  return (
    <div className="Container">
      <h1 className="Title">Games</h1>
      <div className="GamesList">
        {list.map((listItem, index) => {
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
                  <div>{listItem.title}</div>
                  <button
                    className="Button"
                    onClick={() => dispatch(addItem(listItem))}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="SecondRow">${listItem.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
