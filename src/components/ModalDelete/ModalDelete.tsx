import React from "react";
import ReactDOM from "react-dom";
import { ModalDelProps } from "../../types/types";
import style from "./ModalDelete.module.sass";

const ModalDelete: React.FC<ModalDelProps> = ({
  isOpen,
  onClose,
  id,
  deleteCard,
}) => {
  if (!isOpen) return null;

  const deleteSeminar = () => {
    deleteCard(id);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.content}>
        <h2 className={style.title}>Вы уверены?</h2>
        <div className={style.buttons}>
          <button onClick={deleteSeminar}>Да</button>
          <button onClick={onClose}>Передумал</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ModalDelete;
