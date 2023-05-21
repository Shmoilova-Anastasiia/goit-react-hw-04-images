import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ModalStyled,
    Overlay,
} from './Modal.styled';

export const Modal = ({onClose, children}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return window.removeEventListener('keydown', handleClose);
  })

  const handleClose = e => {
    if (e.code === 'Escape') {
      onClose('');
    }
  };

  const handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    };

  return (
    <Overlay onClick={handleBackdropeClick}>
      < ModalStyled>
        {children}
      </ ModalStyled>
    </Overlay>
  );
  
}
Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
}
