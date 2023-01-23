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
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getDataFromAPI(url)
      .then((data) =>
        setList(data.map((item) => ({ ...item, quantity: 1, price: 5 })))
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`App ${theme === "light" ? "Light" : "Dark"}`}>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/list" />} />
        <Route path="/list" element={<List list={list} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
