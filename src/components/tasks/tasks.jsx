import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateListData } from '../../features/slices/listSlice';
import { fetchTaskData } from '../../features/slices/taskSlice';
import useForm from '../../hooks/useForm';
import Button from '../../ui/button/button';
import EditIcon from '../../ui/icons/edit-icon';
import SaveIcon from '../../ui/icons/save-icon';
import Input from '../../ui/input/input';
import { TaskForm } from '../form/task-form';
import Modal from '../modal/modal';
import { TaskItem } from './task-item/task-item';
import style from './tasks.module.css';

export const Tasks = () => {
  //TODO:Разобраться с дизайном, процессбаром
  const { id } = useParams();
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: '',
  });
  const { list } = useSelector(store => store?.listData);
  const { tasks, deleteSuccess, completeSuccess, updateSuccess } = useSelector(
    store => store.tasksData
  );

  const findList = list.find(item => item.id === Number(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskData(id));
    }
  }, [dispatch, id, deleteSuccess, completeSuccess, updateSuccess]);

  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleChangeNameList = () => {
    dispatch(updateListData({ ...values, id: id }));
    setEdit(false);
  };

  return (
    <>
      {id === undefined ? (
        <h3 className={style.hiddenTitle}>Задачи отсутствуют</h3>
      ) : (
        <section className={style.container}>
          {findList && (
            <div className={style.titleAndChange}>
              {edit ? (
                <Input
                  type='text'
                  value={values.name}
                  name={'name'}
                  onChange={handleChange}
                  placeholder='Новое название списка'
                  size={'small'}
                />
              ) : (
                <h2 className={style.title}>{findList.name}</h2>
              )}
              {edit ? (
                <Button
                  onClick={() => handleChangeNameList()}
                  appearance={'ghost'}
                >
                  <SaveIcon />
                </Button>
              ) : (
                <Button appearance={'ghost'} onClick={() => setEdit(!edit)}>
                  <EditIcon />
                </Button>
              )}
            </div>
          )}
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
