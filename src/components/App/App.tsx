import { useCallback, useEffect, useState } from "react";
import { SeminarType } from "../../types/types";
import style from "./App.module.sass";
import Card from "../Card/Card";
import { mainApi } from "../../utils/api";

const App: React.FC = () => {
  const [seminars, setSeminars] = useState<SeminarType[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // получаем список семинаров
    setError(false);
    setLoading(true);
    mainApi
      .getSeminars()
      .then((seminar) => {
        setSeminars(seminar);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteSeminar = useCallback((id: string) => {
    // функция удаления семинара, передаем в пропсах внутрь каждой карточки
    mainApi
      .deleteSeminar(id)
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.filter((el) => el.id !== id)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const editSeminar = useCallback((id: string, updatedData: SeminarType) => {
    // функция редактирования семинара, передаем в пропсах внутрь каждой карточки
    mainApi
      .editSeminar(id, updatedData)
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.map((seminar) =>
            seminar.id === id ? { ...seminar, ...updatedData } : seminar
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.app}>
      {loading ? (
        <h1 className={style.title}>Загрузка...</h1>
      ) : error ? (
        <h1 className={style.title}>Ошибка на сервере</h1>
      ) : (
        <>
          <h1 className={style.title}>Семинары</h1>
          {seminars.map((seminar) => (
            <Card
              {...seminar}
              editCard={editSeminar}
              deleteCard={deleteSeminar}
              key={seminar.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
