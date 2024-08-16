import React from 'react';
import MuiButton from '@mui/material/Button';

interface ButtonInterface {
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: any;
  type?: string;
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
}

const Button: React.FC<ButtonInterface> = ({
  id,
  onClick,
  children,
  type,
  color = 'primary',
  variant = 'outlined',
  className,
}) => {
  return (
    <MuiButton
      className={className}
      id={id}
      fullWidth
      color={color}
      type={type}
      variant={variant}
      onClick={(e) => onClick && onClick(e)}>
      {children}
    </MuiButton>
  );
};

export default Button;
