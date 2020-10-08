import React from 'react';
import './Drawer.css'
import Backdrop from "../../Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const Drawer = ({isOpen, onClose, isAuth}) => {
  const links = [
    {to: '/', label: 'Quiz List', exact: true}
  ]

  if (isAuth) {
    links.push({to: '/quiz-creator', label: 'Create Quiz', exact: false})
    links.push({to: '/logout', label: 'Logout', exact: false})
  } else {
    links.push({to: '/auth', label: 'Auth', exact: false},)
  }

  const renderLinks = () => {
    return links.map((link,index) =>
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            onClick={() => onClose()}
          >
            {link.label}
          </NavLink>
        </li>
    )
  }

  return (
    <>
      <nav className={`drawer ${!isOpen && 'close'}`}>
        <ul>
          {renderLinks()}
        </ul>
      </nav>
      { isOpen && <Backdrop onClose={onClose}/> }
    </>

  );
};

export default Drawer;
