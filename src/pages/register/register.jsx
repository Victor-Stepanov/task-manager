import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Button from '../../UI/button/button';
import Input from '../../UI/input/input';
import style from './register.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    password: '',
    username: '',
  });

  const userRigistr = useCallback(e => {
    e.preventDefault();
    //тут будет dispatch нашей формы
    console.log(values);
  });
  return (
    <div className={style.container}>
      <h2 className='text text_type_main-large'>Регистрация</h2>
      <form className={style.form} onSubmit={userRigistr}>
        <div className='pt-12px pb-12px'>
          <Input
            type='text'
            placeholder='username'
            onChange={handleChange}
            value={values.name}
            name='username'
          />
        </div>
        <div className='pb-12px'>
          <Input
            type='text'
            placeholder='password'
            onChange={handleChange}
            value={values.name}
            name='password'
          />
        </div>
        <Button className='text text_type_main-default'>
          Зарегистрироваться
        </Button>
      </form>
      <p className='pt-12px text text_type_main-small'>
        Уже зарегистрированы?
        <Link className={style.link} to='/login'>
          Войти
        </Link>
      </p>
    </div>
  );
};
