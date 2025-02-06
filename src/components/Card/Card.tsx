import { useState } from "react";
import { SeminarType } from "../../types/types";
import ModalDelete from "../ModalDelete/ModalDelete";
import style from "./Card.module.sass";

const Card: React.FC<SeminarType> = ({
  date,
  description,
  photo,
  time,
  id,
  deleteCard,
  title,
}) => {
  console.log("renderCard");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={style.card}>
        <h2 className={style.title}>{title}</h2>
        <span>{`${date} ${time}`}</span>
        <div className={style.container}>
          <img src={photo} className={style.image} />
          <p className={style.paragraph}>{description}</p>
          <div className={style.buttons}>
            <button className={style.btn}>Изменить</button>
            <button className={style.btn} onClick={() => openModal()}>
              Удалить
            </button>
          </div>
        </div>
      </div>
      <ModalDelete isOpen={isModalOpen} onClose={closeModal} id={id} deleteCard={deleteCard}/>
    </>
  );
};

export default Card;
