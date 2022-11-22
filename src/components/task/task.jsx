import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './task.module.css';

export const Task = () => {
  const { list } = useSelector(store => store?.listData);
  const { id } = useParams();
  const findList = list.find(item => item.id === Number(id));

  return <div className={style.container}>{findList && (
    <h2>{findList.name}</h2>
  )}</div>;
};
