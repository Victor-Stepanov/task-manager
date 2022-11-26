import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Lists } from '../../components/lists/lists';
import { Tasks } from '../../components/tasks/tasks';
import { fetchListData } from '../../features/slices/listSlice';
import style from './main-page.module.css';

const MainPage = () => {
  const { deleteSuccess, listCreateSuccess } = useSelector(
    store => store.listData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListData());
  }, [dispatch, deleteSuccess, listCreateSuccess]);

  return (
    <>
      <main className={style.main}>
        <Lists />
        <Tasks />
        <Outlet />
      </main>
    </>
  );
};

export default MainPage;
