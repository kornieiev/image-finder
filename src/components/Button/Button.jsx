import React from 'react';
import { ButtonAddMore } from './Button.styled';

export default function Button({ onClick, children }) {
  return (
    <>
      <ButtonAddMore onClick={onClick} type="button">
        {children}
      </ButtonAddMore>
    </>
  );
}
