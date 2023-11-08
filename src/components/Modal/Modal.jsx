import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    };
    if (!isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, props]);

  const { largeImageURL } = props;

  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalBox>
        <img src={largeImageURL} alt="" />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}
