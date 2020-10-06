import React from 'react';
import './Input.css'

const Input = ({type, label, value, onChange, errorMessage, valid, touched, shouldValidate}) => {
  const htmlFor = `${type}-${Math.random()}`

  const isValid = (valid, touched, shouldValidate) => {
    return !valid && shouldValidate && touched
  }

  return (
    <div className={`input ${touched && !valid && 'invalid'}`} >
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={`${type ? type : 'text'}`}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />

      {
        isValid(valid, touched, shouldValidate) && <span>{errorMessage}</span>
      }

    </div>
  );
};

export default Input;
