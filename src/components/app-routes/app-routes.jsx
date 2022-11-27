import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../../pages/main/main-page';
import { TaskItem } from '../tasks/task-item/task-item';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Routes location={background || location}>
        <Route path='/' element={<MainPage />}>
          <Route path='task/:id' element={<TaskItem />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
