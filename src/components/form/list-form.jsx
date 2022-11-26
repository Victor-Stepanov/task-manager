import React from 'react';
import { useDispatch } from 'react-redux';
import { sendListData } from '../../features/slices/listSlice';
import useForm from '../../hooks/useForm';
import Button from '../../ui/button/button';
import Input from '../../ui/input/input';
import style from './form.module.css';

const ListForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: '',
  });

  const handleAddList = event => {
    event.preventDefault();
    dispatch(sendListData(values));
    onClose();
  };

  const handleCloseForm = event => {
    event.preventDefault();
    onClose();
  };
  return (
    <form className={style.form} onSubmit={handleAddList}>
      <Input
        type='text'
        value={values.name}
        name={'name'}
        onChange={handleChange}
        placeholder='Название списка'
        size={'small'}
      />
      <div className={style.buttonForm}>
        <Button
          extraClass='mr-12px'
          appearance={'primary'}
          disabled={!values.name}
        >
          Добавить
        </Button>
        <Button appearance={'grey'} onClick={handleCloseForm}>
          Отменить
        </Button>
      </div>
    </form>
  );
};

export { ListForm };
