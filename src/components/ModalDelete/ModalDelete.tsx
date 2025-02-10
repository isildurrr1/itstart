import ReactDOM from "react-dom";
import { ModalDelProps } from "../../types/types";
import style from "./ModalDelete.module.sass";
import React, { useCallback } from "react";

const ModalDelete: React.FC<ModalDelProps> = React.memo(
  ({ isOpen, onClose, id, deleteCard }) => {

    // функция удаления семинара и закрытие модального окна
    const deleteSeminar = () => {
      deleteCard(id);
      onClose();
    };

    // функция  закрытие модального окна при клике на оверлей
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      },
      [onClose]
    );

    if (!isOpen) return null;

    // импользуем порталы, для отображения модального окна вне потока
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
  }
);

export default ModalDelete;
