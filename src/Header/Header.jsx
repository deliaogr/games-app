import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.scss";

const Header = () => {
  return (
    <header className="HeaderContainer">
      <Link to="/list" className="MenuItem">
        Games
      </Link>
      <Link to="/cart" className="MenuItem">
        Cart
      </Link>
    </header>
  );
};

export default Header;
