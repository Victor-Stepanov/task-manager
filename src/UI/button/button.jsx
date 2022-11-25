import cn from 'classnames';
import React from 'react';
import style from './button.module.css';

const Button = ({ appearance, children, extraClass, ...rest }) => {
  const className = cn(style.button, extraClass, {
    [style.primary]: appearance === 'primary',
    [style.ghost]: appearance === 'ghost',
    [style.zero]:appearance === 'zero'
  });

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
