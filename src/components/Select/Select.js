import React from 'react';
import './Select.css'

const Select = ({label, value, onChange, options}) => {
  const htmlFor = `${label}-${Math.random()}`
  return (
    <div className='select'>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={index}
            >
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  );
};

export default Select;
