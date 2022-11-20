import React from 'react';
import style from './input.module.css';

const Input = ({ value, onChange }) => {
  return (
    <div className={style.field}>
      <label className={style.label}>{value}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder='input'
        autoComplete='off'
        className={style.input}
        type='text'
      />
    </div>
  );
};

export default Input;
