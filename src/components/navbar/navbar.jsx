import cn from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteListData } from '../../features/slices/listSlice';
import Button from '../../ui/button/button';
import DeleteIcon from '../../ui/icons/delete-icon';
import ListIcon from '../../ui/icons/list-icon';
import { ListForm } from '../form/list-form';
import Modal from '../modal/modal';
import style from './navbar.module.css';

const Navbar = () => {
  const { list } = useSelector(store => store.listData);
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <div className={style.container}>
      <nav>
        <div className={style.listBox} onClick={goHome}>
          <ListIcon />
          <h3 className='text text_type_title-default'>Список задач</h3>
        </div>
        <div className='pt-12px pb-12px'>
          <Button appearance={'zero'} onClick={handleOpenModal}>
            <span className='text text_type_main-small'>Создать список</span>
          </Button>
          {modal && (
            <Modal onClose={handleCloseModal}>
              <ListForm onClose={handleCloseModal} />
            </Modal>
          )}
        </div>
        <ul className={style.listTodo}>
          {list.length ? (
            list.map(item => <ListItem key={item.id} item={item} />)
          ) : (
            <p>Add item</p>
          )}
        </ul>
      </nav>
    </div>
  );
};

function ListItem({ item }) {
  const dispatch = useDispatch();

  const handleDeleteList = id => {
    dispatch(deleteListData(id));
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [taskId, setTaskId] = useState(null);

  const goTask = id => {
    navigate(`task/${id}`);
    setTaskId(id);
  };

  const path = location.pathname.split('task/')[1];

  return (
    <li
      className={cn(style.listItem, {
        [style.active]: path === String(taskId),
      })}
      onClick={() => {
        goTask(item.id);
      }}
    >
      <p className='text text_type_main-small'>{item.name}</p>
      <Button
        disabled={path === String(taskId)}
        appearance={'ghost'}
        onClick={() => handleDeleteList(item.id)}
      >
        <DeleteIcon />
      </Button>
    </li>
  );
}

export default Navbar;
