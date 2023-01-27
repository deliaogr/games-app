import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List/List";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
import Item from "./Item/Item";
import { ThemeContext } from "./context/ThemeContext";
import "./App.scss";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme === "light" ? "Light" : "Dark"}`}>
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/game/:itemId" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
