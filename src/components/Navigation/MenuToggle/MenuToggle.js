import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './MenuToggle.css'

const MenuToggle = ({onToggle, isOpen}) => (
    <i className={`menuToggle ${isOpen && 'open'}`} onClick={onToggle}>
      {
        isOpen ? <CloseIcon/> : <MenuIcon />
      }
    </i>
)


export default MenuToggle;
