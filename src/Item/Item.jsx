import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  fetchList,
  selectListItem,
  selectListStatus,
} from "../redux/listSlice";
import "./Item.styles.scss";

const Item = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { itemId } = params;

  const listStatus = useSelector(selectListStatus);
  useEffect(() => {
    if (listStatus === "idle") {
      dispatch(fetchList());
    }
  }, [listStatus, dispatch]);

  const item = useSelector((state) => selectListItem(state, itemId));

  if (!item) {
    return (
      <div className="Container">
        <div className="GameNotFoundMessage">
          Game not found! <br /> Go to{" "}
          <Link to="/" className="Link">
            Games
          </Link>
          .
        </div>
      </div>
    );
  }

  return (
    <div className="Container">
      <div className="TitleAndAction">
        <div className="Link" onClick={() => navigate(-1)}>
          Back
        </div>
        <h1 className="Title">{item.title}</h1>
      </div>
      <img src={item.thumbnail} className="Image" alt="Thumbnail" />
      <div className="Details">
        <div className="Description">{item.short_description}</div>
        <div>Genre: {item.genre}</div>
        <div>Platform: {item.platform}</div>
        <div>Developer: {item.developer}</div>
        <div>Publisher: {item.publisher}</div>
        <div>Release Date: {item.release_date}</div>
        <div className="Price">Price: ${item.price}</div>
      </div>
      <button className="EditItem Button">Edit game</button>
    </div>
  );
};

export default Item;
