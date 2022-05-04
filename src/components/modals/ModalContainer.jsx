import React from "react";

export default function ModalContainer({
  visible,
  ignoreContainer,
  children,
  onClose,
}) {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") {
      onClose && onClose();
    } 
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;

    return (
      <div className="rounded w-[47rem] h-[40rem] overflow-auto p-11">
        {children}
      </div>
    );
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClick}
      id="modal-container"
      className="fixed inset-0 bg-red-50 bg-opacity-50 flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
}