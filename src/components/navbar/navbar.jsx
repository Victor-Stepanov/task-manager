import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteListData, sendListData } from '../../features/slices/listSlice';
import useForm from '../../hooks/useForm';
import Button from '../../ui/button/button';
import style from './navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(store => store.listData);

  const { values, handleChange } = useForm({
    name: '',
  });

  const handleAddList = event => {
    event.preventDefault();
    dispatch(sendListData(values));
  };

  const setActive = ({ isActive }) => (isActive ? 'link-active' : 'link');
  return (
    <div className={style.container}>
      <nav>
        <h3 className='text'>Список задач</h3>
        <div className='pt-12px pb-12px'>
          <input
            type='text'
            value={values.name}
            name={'name'}
            onChange={handleChange}
          />
          <Button onClick={handleAddList}>add</Button>
        </div>
        <ul className={style.listTodo}>
          {list.length ? (
            list.map(item => (
              <ListItem key={item.id} name={item.name} id={item.id} />
            ))
          ) : (
            <p>Add item</p>
          )}
        </ul>
      </nav>
    </div>
  );
};

function ListItem({ name, id }) {
  const dispatch = useDispatch();

  const handleDeleteList = id => {
    dispatch(deleteListData(id));
  };

  const location = useLocation();

  return (
    <Link
      to={{
        pathname:`task/${id}`,
        state: { background: location },
      }}
    >
      <li className={` ${style.listItem}`}>
        <p className='text'>{name}</p>
        <Button onClick={() => handleDeleteList(id)}>del</Button>
      </li>
    </Link>
  );
}

export default Navbar;
