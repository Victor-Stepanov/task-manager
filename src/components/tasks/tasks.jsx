import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTaskData } from '../../features/slices/taskSlice';
import Button from '../../ui/button/button';
import { TaskForm } from '../form/task-form';
import Modal from '../modal/modal';
import { TaskItem } from './task-item/task-item';
import style from './tasks.module.css';

export const Tasks = () => {
  //TODO:Разобраться с дизайном, процессбаром

  const dispatch = useDispatch();
  const { list } = useSelector(store => store?.listData);
  const { tasks, deleteSuccess, completeSuccess, updateSuccess } = useSelector(
    store => store.tasksData
  );

  const { id } = useParams();
  const findList = list.find(item => item.id === Number(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskData(id));
    }
  }, [dispatch, id, deleteSuccess, completeSuccess, updateSuccess]);

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  return (
    <>
      {id === undefined ? (
        <h3 className={style.hiddenTitle}>Задачи отсутствуют</h3>
      ) : (
        <section className={style.container}>
          {findList && <h2 className={style.title}>{findList.name}</h2>}
          <div className='pt-12px pb-12px'>
            <Button appearance={'zero'} onClick={handleOpenModal}>
              <span className='text text_type_main-small'>Новая задача</span>
            </Button>
            {modal && (
              <Modal onClose={handleCloseModal}>
                <TaskForm onClose={handleCloseModal} id={id} />
              </Modal>
            )}
          </div>
          <ul className={style.list}>
            {tasks &&
              tasks.map(item => (
                <TaskItem item={item} listId={id} key={item.id} />
              ))}
          </ul>
        </section>
      )}
    </>
  );
};
