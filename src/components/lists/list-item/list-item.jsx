import cn from 'classnames';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteListData } from '../../../features/slices/listSlice';
import Button from '../../../UI/button/button';
import DeleteIcon from '../../../UI/icons/delete-icon';
import style from './list-item.module.css';

export const ListItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteList = useCallback(
    id => {
      dispatch(deleteListData(id));
    },
    [dispatch]
  );

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
      onClick={() => {
        goTask(item.id);
      }}
      className={cn(style.listItem, {
        [style.active]: path === String(taskId),
      })}
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
};
