import cn from 'classnames';
import React, { forwardRef } from 'react';
import style from './input.module.css';

const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className={style.field}>
      <label className={style.label}></label>
      <input
        className={cn(style.input, {
          [style.error]: error,
        })}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
