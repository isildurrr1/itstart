import { useEffect, useState } from "react";
import { SeminarType } from "../../types/types";
import style from "./App.module.sass";
import Card from "../Card/Card";
import { mainApi } from "../../utils/api";

const App: React.FC = () => {
  const [seminars, setSeminars] = useState<SeminarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("renderApp");

  useEffect(() => {
    mainApi
      .getSeminars()
      .then((seminar) => {
        setSeminars(seminar);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteSeminar = (id: string) => {
    mainApi
      .deleteSeminar(id)
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.filter((el) => el.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.app}>
      {loading ? (
        <h1 className={style.title}>Loading...</h1>
      ) : (
        <>
          <h1 className={style.title}>Seminars</h1>
          {seminars.map((seminar) => (
            <Card {...seminar} deleteCard={deleteSeminar} key={seminar.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
