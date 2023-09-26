import React, { useState } from 'react';
import './style.css';

const TopBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
          <li>log out</li>
        </ul>
      )}
    </div>
  );
};

export default TopBar;
