import React from 'react';
import style from './input-checkbox.module.css';

const InputCheckbox = ({ type, value, id, ...props }) => {
  return (
    <div>
      <input
        className={style.inputCheck}
        id={id}
        value={value}
        type={type}
        {...props}
      />
      <label htmlFor={id}></label>
    </div>
  );
};

export default InputCheckbox;
