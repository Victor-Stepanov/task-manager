import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '../../ui/icons/close-icon';
import ModalOverlay from '../modal-overlay/modal-overlay';
import style from './modal.module.css';

const modalRoot = document.querySelector('#modals');

const Modal = ({ title = '', onClose, children }) => {
  //Закрыть модальных окон на Esc
  const handleEscKeydown = evt => {
    evt.key === 'Escape' && onClose();
  };
  //Закрыли модальное окно на крестик
  const closeModalWithTheButton = evt => {
    evt.target && onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  });

  return ReactDOM.createPortal(
    <>
      <div className={style.container}>
        <h3 className={`${style.title} text text_type_main-large mt-10  ml-10`}>
          {title}
        </h3>
        <CloseIcon
          className={style.closeButton}
          onClick={closeModalWithTheButton}
        />
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
