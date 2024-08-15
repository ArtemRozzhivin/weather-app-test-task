import React from 'react';
import MuiButton from '@mui/material/Button';

interface ButtonInterface {
  id?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: any;
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
}

const Button: React.FC<ButtonInterface> = ({
  id,
  onClick,
  children,
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
      variant={variant}
      onClick={(e) => onClick(e)}>
      {children}
    </MuiButton>
  );
};

export default Button;
