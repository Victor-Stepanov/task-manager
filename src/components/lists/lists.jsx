import cn from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/button/button';
import ListIcon from '../../ui/icons/list-icon';
import { ListForm } from '../form/list-form';
import Modal from '../modal/modal';
import { ListItem } from './list-item/list-item';
import style from './lists.module.css';

export const Lists = () => {
  const { list } = useSelector(store => store.listData);
  const [modal, setModal] = useState(false);
  const location = useLocation();

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const navigate = useNavigate();

  const goHome = () => navigate('/');
  const path = location.pathname;

  return (
    <section className={style.container}>
      <div
        className={cn(style.listBox, {
          [style.active]: path === '/',
        })}
        onClick={goHome}
      >
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
    </section>
  );
};
