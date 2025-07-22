import React from 'react';
import type { MenuButtonProps } from '../types';

const MenuButton: React.FC<MenuButtonProps> = ({ label, icon, onClick }) => (
  <button onClick={onClick}>
    {icon && <span>{icon}</span>}
    {label}
  </button>
);

export default MenuButton;
