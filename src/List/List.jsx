import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { fetchList, selectListStatus, selectList } from "../redux/listSlice";
import { Link } from "react-router-dom";
import "./List.styles.scss";

const List = () => {
  const dispatch = useDispatch();

  const listStatus = useSelector(selectListStatus);
  const list = useSelector(selectList);

  useEffect(() => {
    if (listStatus === "idle") {
      dispatch(fetchList());
    }
  }, [listStatus, dispatch]);

  return (
    <div className="Container">
      <h1 className="Title">Games</h1>
      <div className="GamesList">
        {list.items.map((listItem, index) => {
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
