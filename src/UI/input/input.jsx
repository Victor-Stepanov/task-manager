import cn from 'classnames';
import React from 'react';
import style from './input.module.css';

const Input = ({ type, size, extraClass, ...props }) => {
  const className = cn(style.input, extraClass, {
    [style.small]: size === 'small',
    [style.default]: size === 'default',
  });

  return (
    <input type={type} className={className} autoComplete='off' {...props} />
  );
};

export default Input;
