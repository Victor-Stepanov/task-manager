import { Header } from '../header/header';
import { ListTasks } from '../list-task/list-task';
import style from './layout.module.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <ListTasks/>
      </main>
    </>
  );
};
