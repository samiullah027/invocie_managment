import React, { useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const hanleLogOut = () =>{
    navigate("/");
  }
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    console.log('fddas');
  };
  console.log('menu open', isMenuOpen);

  return (
    <div className="top-bar">
      <div className="logo">Your Logo</div>
      <button className="toggle-button" onClick={toggleMenu}>
        Toggle Menu
      </button>
      {isMenuOpen && (
        <ul className="menu-list">
          <li>Home</li>
          <li>About</li>
          <li>Contact US</li>
          <li onClick={hanleLogOut}>log out</li>
        </ul>
      )}
    </div>
  );
};

export default TopBar;
