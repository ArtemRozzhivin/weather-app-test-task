import React from 'react';
import { Dialog } from '@mui/material';
import Button from '../Button';
import { XMarkIcon } from '@heroicons/react/24/solid';

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
          <button type='button' onClick={onClose}>
            <XMarkIcon className='card__icon' />
          </button>
        </div>
        <div className='modal__main'>{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
