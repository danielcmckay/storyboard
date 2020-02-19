import React from 'react';
import './Nav.css'

const Nav = () => {
  return(
    <nav className="Nav">
      <h1>StoryBoard</h1>
      <ul className="NavList">
        <li className="NavItem">Stories</li>
        <li className="NavItem">Settings</li>
        <li className="NavItem">Logout</li>
      </ul>
    </nav>
  )
}

export default Nav;