import React from 'react';
import { Dialog } from '@mui/material';
import Button from '../Button';

import './style.scss';

interface ModalInterface {
  isOpen: boolean;
  children: any;
  className?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalInterface> = ({ isOpen, children, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className='modal'>
        <div className='modal__closeButton'>
          <Button onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='modal__icon'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </Button>
        </div>

        <div className='modal__main'>{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
