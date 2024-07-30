import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [menu, setMenu]=useState(false);

  const toggleMenu=()=>{
    setMenu(!menu);
  }

  const closeMenu =()=>{
    setMenu(false)
  }

  let loggedInUser = sessionStorage.getItem('loggedInUser')
  return (
    <div id='navbar'>
      <nav>
        <h1 id='Navbar-title'>Portfolio</h1>
        <ul className={menu ? 'show': 'hide'}>
          <li>
            <NavLink to='/' onClick={closeMenu}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/student' onClick={closeMenu}>
              Create Resume
            </NavLink>
          </li>
          {
            (!loggedInUser) && (
              <li>
                <NavLink to='/register'>
                  Register
                </NavLink>
              </li>
            )
          }
          {
            (!loggedInUser)  && (
              <li>
            <NavLink to='/login' onClick={closeMenu}>
              Login
            </NavLink>
          </li>
            )
          }
          {
            (loggedInUser) && (
              <li>
            <NavLink
              to='/'
              onClick={() => {
                sessionStorage.removeItem('loggedInUser');
                sessionStorage.clear();
              }}
            >
               LogOut           
            </NavLink>
          </li>
            )
          }
        </ul>
        <div id='right'>
          <input id="checkbox" type="checkbox" onChange={toggleMenu} checked={menu} />
          <label className="toggle" htmlFor="checkbox">
            <div id="bar1" className="bars"></div>
            <div id="bar2" className="bars"></div>
            <div id="bar3" className="bars"></div>
          </label>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
