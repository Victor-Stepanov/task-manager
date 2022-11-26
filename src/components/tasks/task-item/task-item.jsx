import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  completeTaskData,
  deleteTaskData,
  updateTaskData,
} from '../../../features/slices/taskSlice';
import useForm from '../../../hooks/useForm';
import Button from '../../../ui/button/button';
import DeleteIcon from '../../../ui/icons/delete-icon';
import EditIcon from '../../../ui/icons/edit-icon';
import SaveIcon from '../../../ui/icons/save-icon';
import Input from '../../../ui/input/input';
import style from './task-item.module.css';

export const TaskItem = ({ item, listId }) => {
  //TODO:Сделать кнопку completed, поработать над дизайном, заменить иконку удаления

  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const { values, handleChange } = useForm({
    name: '',
  });

  const handleDeleteTask = useCallback(
    id => {
      dispatch(deleteTaskData(id));
    },
    [dispatch]
  );

  const handleCompleteTask = useCallback(
    id => {
      dispatch(completeTaskData(id));
    },
    [dispatch]
  );

  const handleEditTask = id => {
    setEdit(false);
    dispatch(
      updateTaskData({
        ...values,
        id: id,
        todo_list: listId,
      })
    );
    console.log({
      ...values,
      id: id,
      todo_list: listId,
    });
  };

  return (
    <>
      {item && (
        <li key={item.id} className={style.listItem}>
          <label className={style.inputTaskLabel}>
            <input type='radio' className={style.inputTaskCheckbox} />
          </label>
          {edit ? (
            <Input
              type='text'
              value={values.name}
              name={'name'}
              onChange={handleChange}
              placeholder='Новая задача'
              size={'default'}
            />
          ) : (
            <p className={`text text_type_main-default `}>{item.name}</p>
          )}
          <div className={style.listBtn}>
            {edit ? (
              <Button
                onClick={() => handleEditTask(item.id)}
                extraClass={style.btn}
              >
                <SaveIcon />
              </Button>
            ) : (
              <Button extraClass={style.btn} onClick={() => setEdit(!edit)}>
                <EditIcon />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteTask(item.id)}
              extraClass={style.btn}
            >
              <DeleteIcon />
            </Button>
          </div>
        </li>
      )}
    </>
  );
};
