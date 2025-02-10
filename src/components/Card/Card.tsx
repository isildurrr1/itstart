import React, { useCallback, useState } from "react";
import { CardProps } from "../../types/types";
import ModalDelete from "../ModalDelete/ModalDelete";
import style from "./Card.module.sass";
import ModalEdit from "../ModalEdit/ModalEdit";

const Card: React.FC<CardProps> = React.memo(
  ({ date, description, photo, time, id, deleteCard, editCard, title }) => {

    // состояние модальных окон
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // фунции для открытия/закрытия модальных окон
    const openDelModal = useCallback(() => setIsDelModalOpen(true), []);
    const closeDelModal = useCallback(() => setIsDelModalOpen(false), []);
    const openEditModal = useCallback(() => setIsEditModalOpen(true), []);
    const closeEditModal = useCallback(() => setIsEditModalOpen(false), []);

    return (
      <>
        <div className={style.card}>
          <h2 className={style.title}>{title}</h2>
          <span>{`${date} ${time}`}</span>
          <div className={style.container}>
            <img src={photo} className={style.image} />
            <p className={style.paragraph}>{description}</p>
            <div className={style.buttons}>
              <button className={style.btn} onClick={() => openEditModal()}>
                Изменить
              </button>
              <button className={style.btn} onClick={() => openDelModal()}>
                Удалить
              </button>
            </div>
          </div>
        </div>
        <ModalDelete
          isOpen={isDelModalOpen}
          onClose={closeDelModal}
          id={id}
          deleteCard={deleteCard}
        />
        <ModalEdit
          seminarData={{ date, description, photo, time, id, title }}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          id={id}
          editCard={editCard}
        />
      </>
    );
  }
);

export default Card;
