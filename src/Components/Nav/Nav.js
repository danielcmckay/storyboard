import React, {useContext} from "react";
import "./Nav.css";
import {NavLink} from 'react-router-dom';
import themeContext from '../../context/themeContext';
import {AuthContext} from '../../context/AuthContext';

const Nav = () => {
  const {dark} = useContext(themeContext);
  const {logout} = useContext(AuthContext)

  const logoutHandler = e => {
    logout();
  }

  return (
    <nav className={!dark ? "Nav" : "Nav Nav-dark"}>
      <span className="TitleSpan">
        <NavLink to='/'><h1>StoryBoard</h1></NavLink>
        
        <span className="title-decoration-wrapper">
          <div className="title-decoration"></div>
          <div className="title-decoration"></div>
          <div className="title-decoration"></div>
        </span>
      </span>
      <ul className="NavList">
        <li className="NavItem"><NavLink to="/settings">Settings</NavLink></li>
        <li className="NavItem" onClick={logoutHandler}>Logout</li>
      </ul>
    </nav>
  );
};

export default Nav;
