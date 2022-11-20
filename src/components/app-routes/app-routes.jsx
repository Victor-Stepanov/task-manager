import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../../pages';
import { Layout } from '../layout/layout';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
