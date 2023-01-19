import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import List from "./List/List";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
import { ThemeContext } from "./context/ThemeContext";
import "./App.scss";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "557ebd882bmsh83449b7eb3c4bf2p1dbecejsn4f882cb4ef97",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

const url =
  "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc";

const getDataFromAPI = async (url) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

function App() {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState(initialCart());
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getDataFromAPI(url)
      .then((data) =>
        setList(data.map((item) => ({ ...item, quantity: 1, price: 5 })))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    function handleBeforeUnload(event) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cart]);

  function initialCart() {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      return JSON.parse(storedCart);
    } else {
      return [];
    }
  }

  const addToCart = (item) => {
    /*   let copyOfCart = [...cart];
    let existingCartItemPos = cart.findIndex(
      (cartItem) => item.id === cartItem.id
    );

    if (!isNaN(existingCartItemPos) && existingCartItemPos >= 0) {
      copyOfCart[existingCartItemPos].quantity++;
    } else {
      copyOfCart = [...copyOfCart, { ...item, quantity: 1 }];
    } */

    setCart(
      cart.find((game) => game.id === item.id)
        ? cart.map((game) =>
            game.id === item.id
              ? { ...game, quantity: game.quantity + 1 }
              : game
          )
        : [...cart, item]
    );
  };

  return (
    <div className={`App ${theme === "light" ? "Light" : "Dark"}`}>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/list" />} />
        <Route
          path="/list"
          element={<List list={list} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}

export default App;
