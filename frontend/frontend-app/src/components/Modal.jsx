import React from "react";

const Modal = ({ onClose, children }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackgroundClick} className="modal-background">
      <div className="modal-content">
        <div> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
