import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <menu className={style.menu}>
        <NavLink>Задачи</NavLink>
        <NavLink>Лого</NavLink>
        <NavLink>Профиль</NavLink>
      </menu>
    </header>
  );
};
