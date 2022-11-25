import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import style from './layout.module.css';

export const Layout = () => {
  return (
    <>
      <main className={style.main}>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};
