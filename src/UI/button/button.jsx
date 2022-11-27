import cn from 'classnames';
import React from 'react';
import style from './button.module.css';

const Button = ({ appearance, children, extraClass, ...rest }) => {
  const className = cn(
    style.button,
    {
      [style.primary]: appearance === 'primary',
      [style.grey]: appearance === 'grey',
      [style.ghost]: appearance === 'ghost',
      [style.zero]: appearance === 'zero',
    },
    extraClass
  );

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
