import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../ui/button/button';
import ProfileIcon from '../../ui/icons/profile-icon';
import LoginForm from '../form/login-form/login-form';
import RegisterForm from '../form/register-form/register-form';
import Modal from '../modal/modal';
import style from './header.module.css';

export const Header = () => {
  const { user } = useSelector(store => store.userData);
  let title = user ? user.username : 'Профиль';
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModal(false);
  };

  return (
    <header className={style.header}>
      <menu className={style.menu}>
        <p className={style.user}>
          <ProfileIcon />
          <span className='pl-12px text text_type_main-default'>{title}</span>
        </p>
        <Button extraClass='ml-12px mr-12px' onClick={handleOpenLoginModal}>
          Авторизация
        </Button>
        <Button onClick={handleOpenRegisterModal}>Регистрация</Button>
        {loginModal && (
          <Modal onClose={handleCloseLoginModal}>
            <LoginForm onClose={handleCloseLoginModal} />
          </Modal>
        )}
        {registerModal && (
          <Modal onClose={handleCloseRegisterModal}>
            <RegisterForm onClose={handleCloseRegisterModal} />
          </Modal>
        )}
      </menu>
    </header>
  );
};
