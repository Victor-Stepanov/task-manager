import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <menu className={style.menu}>
        <NavLink className={style.menuLink} to='/'>
          Задачи
        </NavLink>
        <NavLink className={style.menuLink}>Лого</NavLink>
        <NavLink className={style.menuLink}>Профиль</NavLink>
      </menu>
    </header>
  );
};
