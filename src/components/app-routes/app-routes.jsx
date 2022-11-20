import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../../pages';
import { Layout } from '../layout/layout';
import { ListTasks } from '../list-task/list-task';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/list'  element={<ListTasks />}/>
      </Routes>
    </div>
  );
};

export default AppRoutes;
