export interface SeminarType {
  date: string;
  description: string;
  id: string;
  photo: string;
  time: string;
  title: string;
}

export interface ModalEditProps {
  seminarData: SeminarType;
  isOpen: boolean;
  onClose: () => void;
  id: string;
  editCard: (id: string, newData: SeminarType) => void;
}

export interface CardProps {
  date: string;
  description: string;
  id: string;
  photo: string;
  time: string;
  title: string;
  deleteCard: (id: string) => void;
  editCard: (id: string, newData: SeminarType) => void;
}

export interface getSeminarsResponse {
  seminars: SeminarType[];
}

export interface IMainApiOptions {
  baseUrl: string;
}

export interface ModalDelProps {
  isOpen: boolean;
  id: string;
  deleteCard: (id: string) => void;
  onClose: () => void;
}
