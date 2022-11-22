import React from 'react';
import style from './button.module.css';

const Button = ({ children, ...rest }) => {
  return <button className={style.button} {...rest}>{children}</button>;
};

export default Button;
