// import "../styles/popUpMessageStyle.css"

// function PopupMessage({content}:{content: string}) {
//   return (
//     <div className="popup">{content}</div>
//   );
// }

// export default PopupMessage;

// create a popup toast and export a hook to use it

// import { useState } from 'react'
// import '../styles/popUpMessageStyle.css'

// export default function PopupMessage({content}:{content: string}) {
//   const [displayPopup, setDisplayPopup] = useState<boolean>(true);
//   setTimeout(() => {
//     setDisplayPopup(false);
//   }, 2000);
//   return (
//     <>
//     {displayPopup && <div className="popup">{content}</div>}
//     </>
//   );
// }

// Toast.tsx

/// <reference types="react/canary" />

import React, { useEffect } from 'react';
import '../styles/toastStyle.css';

interface ToastProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
      <div className="popup" 
      // popover="auto"
      
      >{message}</div>
  );
};

export default Toast;

