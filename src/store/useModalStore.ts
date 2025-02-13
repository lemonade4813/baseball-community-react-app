import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  message: string;
  callback: (() => void) | null;
  openModal: (message: string, callback?: () => void, buttonText? : string) => void;
  closeModal: () => void;
  buttonText : string;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: "",
  callback: null,
  buttonText : "",
  openModal: (message, callback, buttonText) =>
    set({ isOpen: true, message, callback, buttonText}),
  closeModal: () =>
    set(() => {
      return { isOpen: false, message: "", callback: null , buttonText : ''};
    }),
}));