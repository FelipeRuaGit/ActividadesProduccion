// AddButton.tsx
import React from 'react';
import { Button } from 'primereact/button';
import { IAddButton } from './IAddButton';


const AddButton: React.FC<IAddButton> = ({ text, icon, action, disabled = false, loadingText = '' }) => {
  return (
    <Button
      label={disabled ? loadingText : text}
      icon={icon}
      iconPos="left"
      onClick={!disabled ? action : undefined}
      disabled={disabled}
      className="p-button-rounded p-button-primary shadow-md hover:shadow-lg transition-shadow duration-200"
    />
  );
};

export default AddButton;
