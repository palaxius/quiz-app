import React from 'react';
import './Button.css'

const Button = ({children, onClick, disabled, type}) => {
  return (
    <button
      className={`button ${type}-type`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
