import React from 'react';
import './main-button.component.css';

const MainButton: React.FC<{
  onClick: () => void;
  enabled?: boolean;
  options?: { title?: string };
}> = ({ onClick, enabled = true, options }) => {
  return (
    <button
      className={`mainbutton ${!enabled ? 'mainbutton-disabled' : ''}`}
      disabled={!enabled}
      onClick={onClick}
    >
      {options && options.title ? options.title : ''}
    </button>
  );
};

export default MainButton;
