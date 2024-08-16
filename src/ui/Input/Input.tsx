import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import TextField from '@mui/material/TextField';
import React from 'react';

import './style.scss';

interface InputInterface {
  value?: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string | null;
  onClear?: () => void;
  error?: string | null | boolean;
}

const Input: React.FC<InputInterface> = React.forwardRef<HTMLDivElement, InputInterface>(
  ({ value, onChange, placeholder, error, onClear, type, name, id }, ref) => {
    const isError = !!error;
    const isEmpty = !!value;

    const handleClear = () => {
      if (onClear) {
        onClear();
      }

      onChange && onChange('');
    };
    1;
    return (
      <div className='input'>
        <div className='input__element'>
          <TextField
            fullWidth
            color='primary'
            ref={ref}
            type={type}
            name={name}
            id={id}
            label={placeholder}
            variant='outlined'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={isError}
          />
          {isEmpty && (
            <button type='button' onClick={handleClear} className='input__clearIcon'>
              <XMarkIcon className='input__icon' />
            </button>
          )}

          {isError && !isEmpty && (
            <div className='input__errorIcon'>
              <ExclamationCircleIcon className='input__icon input__icon-red' aria-hidden />
            </div>
          )}
        </div>
        {isError && <p className='input__error'>{error}</p>}
      </div>
    );
  },
);

export default Input;
