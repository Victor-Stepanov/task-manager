import { Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../../pages';
import { Layout } from '../layout/layout';
import { Task } from '../task/task';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  
  return (
    <div>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route path='register' element={<RegisterPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='task/:id' element={<Task />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
