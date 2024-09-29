// Toggle.tsx
import React, { useState } from 'react';
import '../styles/toggleStyle.css'; // Import your CSS for styling

interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  dir: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ leftLabel, rightLabel, dir }) => {
  const [isActive, setIsActive] = useState(dir);

    const toggle = () => {
      setIsActive(!isActive);
    };
  
    return (
      <div className={`toggle ${isActive ? 'active' : ''}`} onClick={toggle}>
        <div className="toggle-label toggle-left">{leftLabel}</div>
        <div className="toggle-handle" />
        <div className="toggle-label toggle-right">{rightLabel}</div>
      </div>
    );
  };
  
  export default Toggle;
  