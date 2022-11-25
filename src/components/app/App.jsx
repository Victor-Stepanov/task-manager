import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListData } from '../../features/slices/listSlice';
import { getUserInfo } from '../../features/slices/userSlice';
import AppRoutes from '../app-routes/app-routes';
import './app.css';

function App() {
  const dispatch = useDispatch();
  const { listCreateSuccess, deleteSuccess } = useSelector(
    store => store.listData
  );
  useEffect(() => {
    dispatch(fetchListData());
    dispatch(getUserInfo());
  }, [dispatch, listCreateSuccess, deleteSuccess]);

  return (
    <div className='App'>
      <AppRoutes />
    </div>
  );
}

export default App;
