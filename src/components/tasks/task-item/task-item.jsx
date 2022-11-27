import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  completeTaskData,
  deleteTaskData,
  updateTaskData,
} from '../../../features/slices/taskSlice';
import useForm from '../../../hooks/useForm';
import Button from '../../../UI/button/button';
import DeleteIcon from '../../../UI/icons/delete-icon';
import EditIcon from '../../../UI/icons/edit-icon';
import SaveIcon from '../../../UI/icons/save-icon';
import InputCheckbox from '../../../UI/input-checkbox/input-checkbox';
import Input from '../../../UI/input/input';
import style from './task-item.module.css';

export const TaskItem = ({ item, listId }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [check, setCheck] = useState(false);

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
      setCheck(!check);
    },
    [dispatch, check]
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
  };

  return (
    <>
      {item && (
        <li key={item.id} className={style.listItem}>
          <InputCheckbox
            id={item.id}
            type='checkbox'
            value={check}
            onClick={() => handleCompleteTask(item.id)}
          />
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
                appearance={'ghost'}
              >
                <SaveIcon />
              </Button>
            ) : (
              <Button appearance={'ghost'} onClick={() => setEdit(!edit)}>
                <EditIcon />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteTask(item.id)}
              appearance={'ghost'}
            >
              <DeleteIcon />
            </Button>
          </div>
        </li>
      )}
    </>
  );
};
