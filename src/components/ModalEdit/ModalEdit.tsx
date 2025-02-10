import ReactDOM from "react-dom";
import style from "./ModalEdit.module.sass";
import { ModalEditProps, SeminarType } from "../../types/types";
import { useForm, Controller } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";

const ModalEdit: React.FC<ModalEditProps> = React.memo(
  ({ seminarData, isOpen, onClose, id, editCard }) => {
    const [initialData, setInitialData] = useState(seminarData);

    // использование react-hook-form для валидации данных на сторолне клиента
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<SeminarType>({
      defaultValues: seminarData,
    });

    // сбрасываем данные и заполняем форму данными из пропсов
    useEffect(() => {
      reset(seminarData);
      setInitialData(seminarData); // сохраняем переданные значения, чтобы сравнить в будущем с новыми
    }, [seminarData, reset]);

    // функция отправки формы при сабмите и закрытие формы
    const onSubmit = useCallback(
      (data: SeminarType) => {
        // проверка, что данные не изменились, чтобы не отправлять лишние запросы
        if (JSON.stringify(data) !== JSON.stringify(initialData)) {
          editCard(id, data);
        }
        onClose();
      },
      [editCard, id, initialData, onClose]
    );

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
      <div className={style.overlay} onMouseDown={handleOverlayClick}>
        <div className={style.content}>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.field}>
              <label htmlFor="title" className={style.label}>
                Заголовок
              </label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Title is required",
                }}
                render={({ field }) => (
                  <input {...field} id="title" className={style.input} />
                )}
              />
              {errors.title && (
                <span className={style.error}>{errors.title.message}</span>
              )}
            </div>

            <div className={style.field}>
              <label htmlFor="description" className={style.label}>
                Описание
              </label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    className={style.input}
                  />
                )}
              />
              {errors.description && (
                <span className={style.error}>
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className={style.field}>
              <label htmlFor="photo" className={style.label}>
                Обложка
              </label>
              <Controller
                name="photo"
                control={control}
                rules={{
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: "Invalid URL",
                  },
                }}
                render={({ field }) => (
                  <input {...field} id="photo" className={style.input} />
                )}
              />
              {errors.photo && (
                <span className={style.error}>{errors.photo.message}</span>
              )}
            </div>

            <div className={style.field}>
              <label htmlFor="date" className={style.label}>
                Дата
              </label>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "Date is required",
                  pattern: {
                    value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                    message: "Date must be in the format DD.MM.YYYY",
                  },
                }}
                render={({ field }) => (
                  <input {...field} id="date" className={style.input} />
                )}
              />
              {errors.date && (
                <span className={style.error}>{errors.date.message}</span>
              )}
            </div>

            <div className={style.field}>
              <label htmlFor="time" className={style.label}>
                Время
              </label>
              <Controller
                name="time"
                control={control}
                rules={{
                  required: "Time is required",
                  pattern: {
                    value: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
                    message: "Time must be in the format HH:MM",
                  },
                }}
                render={({ field }) => (
                  <input {...field} id="time" className={style.input} />
                )}
              />
              {errors.time && (
                <span className={style.error}>{errors.time.message}</span>
              )}
            </div>

            <div className={style.buttons}>
              <button type="submit" className={style.submitButton}>
                Сохранить
              </button>
              <button
                type="button"
                onClick={onClose}
                className={style.cancelButton}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("modal-root") as HTMLElement
    );
  }
);

export default ModalEdit;
