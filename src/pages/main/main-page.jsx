import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Lists } from '../../components/lists/lists';
import { Tasks } from '../../components/tasks/tasks';
import { fetchListData } from '../../features/slices/listSlice';
import { getUserInfo } from '../../features/slices/userSlice';
import style from './main-page.module.css';

const MainPage = () => {
  const { deleteSuccess, listCreateSuccess, updateSuccess } = useSelector(
    store => store.listData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListData());
    dispatch(getUserInfo());
  }, [dispatch, deleteSuccess, listCreateSuccess, updateSuccess]);

  return (
    <>
      <Header />
      <main className={style.main}>
        <Lists />
        <Tasks />
        <Outlet />
      </main>
    </>
  );
};

export default MainPage;
