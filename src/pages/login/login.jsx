import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendLoginData } from '../../features/slices/userSlice';
import useForm from '../../hooks/useForm';
import Button from '../../ui/button/button';
import Input from '../../ui/input/input';
import style from './login.module.css';

export const LoginPage = () => {
  const { values, handleChange } = useForm({
    password: '',
    username: '',
  });
  const dispatch = useDispatch();

  const userLogin = useCallback(
    e => {
      e.preventDefault();
      dispatch(sendLoginData(values));
    },
    [dispatch, values]
  );

  return (
    <div className={style.container}>
      <h2 className='text text_type_main-large'>Вход</h2>
      <form className={style.form} onSubmit={userLogin}>
        <div className='pt-12px pb-12px'>
          <Input
            type='text'
            placeholder='username'
            onChange={handleChange}
            value={values.name}
            name={'username'}
          />
        </div>
        <div className='pb-12px'>
          <Input
            type='text'
            placeholder='password'
            onChange={handleChange}
            value={values.name}
            name={'password'}
          />
        </div>
        <Button className='text text_type_main-default'>Войти</Button>
      </form>
      <p className='pt-12px text text_type_main-small'>
        Вы — новый пользователь?
        <Link className={style.link} to={{ pathname: '/register' }}>
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};
