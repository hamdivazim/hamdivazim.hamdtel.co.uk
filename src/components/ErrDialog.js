import React, { useState } from 'react';
import '../index.css';

const Dialog = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
      <div>
        {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-content">
              <p>{message}</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default Dialog;
