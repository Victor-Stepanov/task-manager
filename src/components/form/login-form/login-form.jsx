import React from 'react';
import { useDispatch } from 'react-redux';
import { sendLoginData } from '../../../features/slices/userSlice';
import useForm from '../../../hooks/useForm';
import Button from '../../../ui/button/button';
import Input from '../../../ui/input/input';
import style from './login-form.module.css';

const LoginForm = ({ onClose }) => {
  const { values, handleChange } = useForm({
    password: '',
    username: '',
  });
  const dispatch = useDispatch();

  const userLogin = event => {
    event.preventDefault();
    dispatch(sendLoginData(values));
    onClose();
  };

  return (
    <form className={style.form} onSubmit={userLogin}>
      <h2 className='text .text_type_title-default'>Вход</h2>
      <div className='pt-12px pb-12px'>
        <Input
          type='text'
          placeholder='username'
          onChange={handleChange}
          value={values.name}
          name={'username'}
          size={'default'}
        />
      </div>
      <div className='pb-12px'>
        <Input
          type='password'
          placeholder='password'
          onChange={handleChange}
          value={values.name}
          name={'password'}
          size={'default'}
        />
      </div>
      <div className={style.formBtn}>
        <Button appearance={'primary'} extraClass='mr-12px'>
          <span className='text text_type_main-default'>Авторизация</span>
        </Button>
        <Button appearance={'grey'} onClick={onClose}>
          <span className='text text_type_main-default'>Отменить</span>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
