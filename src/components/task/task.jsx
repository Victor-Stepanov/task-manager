import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  completeTaskData,
  deleteTaskData,
  fetchTaskData,
} from '../../features/slices/taskSlice';
import Button from '../../ui/button/button';
import DeleteIcon from '../../ui/icons/delete-icon';
import EditIcon from '../../ui/icons/edit-icon';
import { TaskForm } from '../form/task-form';
import Modal from '../modal/modal';
import style from './task.module.css';

export const Task = () => {
  //TODO:Разобраться с дизайном, процессбаром

  const dispatch = useDispatch();
  const { list } = useSelector(store => store?.listData);
  const { tasks, deleteSuccess, completeSuccess } = useSelector(
    store => store.tasksData
  );

  const { id } = useParams();
  const findList = list.find(item => item.id === Number(id));

  useEffect(() => {
    dispatch(fetchTaskData(id));
  }, [dispatch, id, deleteSuccess, completeSuccess]);

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  if(!id){
    <h3>Задачи отсутствуют</h3>;
  }
 
  return (
    <div className={style.container}>
      {findList && (
        <div>
          <h2 className={style.title}>{findList.name}</h2>
        </div>
      )}
      <div className='pt-12px pb-12px'>
        <Button appearance={'zero'} onClick={handleOpenModal}>
          <span className='text text_type_main-small'>Создать список</span>
        </Button>
        {modal && (
          <Modal onClose={handleCloseModal}>
            <TaskForm onClose={handleCloseModal} id={id} />
          </Modal>
        )}
      </div>
      <ul className={style.list}>
        {tasks.length ? (
          tasks.map(item => <TaskItem item={item} key={item.id} />)
        ) : (
          <p className='text'>Задачи отсутствуют</p>
        )}
      </ul>
    </div>
  );
};

export function TaskItem({ item }) {
  //TODO:Сделать кнопку completed, поработать над дизайном, заменить иконку удаления
  const dispatch = useDispatch();

  const handleDeleteTask = id => {
    dispatch(deleteTaskData(id));
  };

  const handleCompleteTask = id => {
    dispatch(completeTaskData(id));
    
  };

  const handleEditTask = id => {
    console.log(id);
    setCheck(true)
    console.log(check)
  };

  const [check, setCheck] = useState(false);

  return (
    <li key={item.id} className={style.listItem}>
      <label className={style.inputTaskLabel}>
        <input
          type='radio'
          value={check}
          onClick={() => handleEditTask(item.id)}
          className={style.inputTaskCheckbox}
        />
      </label>
      <p className={`text text_type_main-default `}>{item.name}</p>
      <div className={style.listBtn}>
        <EditIcon className='pr-12px' onClick={() => handleEditTask(item.id)} />
        <DeleteIcon
          className={style.test}
          onClick={() => handleDeleteTask(item.id)}
        />
      </div>
    </li>
  );
}
