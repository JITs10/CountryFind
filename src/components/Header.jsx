import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header-container">
      <div className="header-content">
        <h2 className="title"> <i className="fa-solid fa-globe"></i> <a href="/">Where in the world?</a></h2>
        <p className="theme-changer" onClick={toggleTheme}>
          <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-regular fa-moon'}></i>
          &nbsp;&nbsp;{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </p>
      </div>
    </header>
  );
}

export default Header;
