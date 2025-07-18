// ContinueButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ContinueButtonProps {
  to: string; // The path to navigate to when the button is clicked
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ to }) => {
  let navigate = useNavigate(); // Hook to handle navigation

  const handleClick = () => {
    navigate(to); // Navigate to the passed `to` prop path
  };

  const buttonStyle = {
    width: '100%',
    height: '100%',
    background: '#F5F5F5',
    borderRadius: '6px',
    border: '1px solid #6C6363',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#000'
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      Continue
    </button>
  );
};

export default ContinueButton;
