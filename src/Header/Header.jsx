import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import "./Header.styles.scss";

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`HeaderContainer`}
    >
      <div className="Actions">
        <Link to="/list" className="MenuItem">
          Games
        </Link>
        <Link to="/cart" className="MenuItem">
          Cart
        </Link>
      </div>
      <button onClick={() => toggleTheme()} className="Button">
        Change theme
      </button>
    </header>
  );
};

export default Header;
