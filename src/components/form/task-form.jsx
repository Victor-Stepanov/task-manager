import React from 'react';
import { useDispatch } from 'react-redux';
import { sendTaskData } from '../../features/slices/taskSlice';
import useForm from '../../hooks/useForm';
import Button from '../../UI/button/button';
import Input from '../../UI/input/input';
import style from './form.module.css';

const TaskForm = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    todo_list: id,
    name: '',
  });

  const handleAddTask = event => {
    event.preventDefault();
    dispatch(sendTaskData(values));
    onClose();
  };

  const handleCloseForm = event => {
    event.preventDefault();
    onClose();
  };
  return (
    <form className={style.form} onSubmit={handleAddTask}>
      <Input
        type='text'
        value={values.name}
        name={'name'}
        onChange={handleChange}
        placeholder='Новая задача'
        size={'default'}
      />
      <div className={style.buttonForm}>
        <Button
          type='submit'
          extraClass='mr-12px'
          appearance={'primary'}
          disabled={!values.name}
        >
          Добавить задачу
        </Button>
        <Button appearance={'grey'} onClick={handleCloseForm}>
          Отменить
        </Button>
      </div>
    </form>
  );
};

export { TaskForm };
