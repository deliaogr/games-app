import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, increment, decrement } from "../redux/cartSlice";
import "./Cart.styles.scss";

const Cart = () => {
  const [show, setShow] = useState(-1);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((acc, game) => {
      return acc + +game.quantity * +game.price;
    }, 0);
    return total;
  };

  return (
    <div className="Container">
      <h1 className="Title">Cart</h1>
      {!cart.length ? (
        <div className="EmptyCartMessage">
          The cart is empty! <br /> Go to{" "}
          <Link to="/" className="Link">
            Games
          </Link>
          .
        </div>
      ) : (
        <>
          <div className="GamesList">
            {cart.map((cartItem, index) => {
              return (
                <div key={cartItem.id} className="ListItem">
                  <div className="FirstRow">
                    <div className="Index">{index + 1}.</div>
                    <img
                      src={cartItem.thumbnail}
                      className="Thumbnail"
                      alt="thumbnail"
                    />
                    <div className="ItemName">
                      <Link to={`/game/${cartItem.id}`} className="Link">
                        {cartItem.title}
                      </Link>
                      <div className="ButtonsAndQuantity">
                        <div className="Quantity">x{cartItem.quantity}</div>
                        <button
                          className="Button"
                          onClick={() => setShow(show === index ? -1 : index)}
                        >
                          <xml version="1.0" encoding="utf-8" />
                          <svg
                            fill="#ffffff"
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="Edit"
                          >
                            <path d="M8.661,19.113,3,21l1.887-5.661ZM20.386,7.388a2.1,2.1,0,0,0,0-2.965l-.809-.809a2.1,2.1,0,0,0-2.965,0L6.571,13.655l3.774,3.774Z" />
                          </svg>
                        </button>
                        {show === index ? (
                          <div className="EditQuantity">
                            <button
                              className="Button"
                              onClick={() => dispatch(increment(cartItem))}
                            >
                              +
                            </button>

                            <button
                              className="Button"
                              onClick={() => dispatch(decrement(cartItem))}
                            >
                              -
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}

                        <button
                          className="Button"
                          onClick={() => dispatch(removeItem(cartItem))}
                        >
                          <xml version="1.0" encoding="utf-8" />
                          <svg
                            fill="#ffffff"
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="TrashCanIcon"
                          >
                            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="SecondRow">${cartItem.price}</div>
                </div>
              );
            })}
          </div>
          <div className="TotalPrice">Total: ${calculateTotalPrice(cart)}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
