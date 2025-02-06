export interface SeminarType {
  date: string;
  description: string;
  id: string;
  photo: string;
  time: string;
  title: string;
  deleteCard: (id: string) => void;
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