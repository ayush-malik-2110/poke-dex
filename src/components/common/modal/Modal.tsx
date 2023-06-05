import React, { MouseEventHandler } from 'react'
import { Modal as MaterialModal } from '@mui/material'

export type ModalProps = {
  children: JSX.Element,
  onCloseModal: MouseEventHandler<HTMLDivElement>,
  showModal: boolean,
};

const Modal = ({ children, onCloseModal, showModal = false }: ModalProps) => (
  <MaterialModal
    open={showModal}
    onClose={onCloseModal}>
    {children}
  </MaterialModal>
);

export default Modal;