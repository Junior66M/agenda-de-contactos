import React from 'react';
import { useTheme } from '../context/TemaContex'; 

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌑 Modo Oscuro' : '☀️ Modo Claro'}
    </button>
  );
}

export default ThemeToggle;