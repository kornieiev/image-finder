import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalBox>
          <img src={largeImageURL} alt="" />
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}
