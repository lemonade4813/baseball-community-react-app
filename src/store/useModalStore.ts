import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  message: string;
  callback: (() => void) | null;
  openModal: (message: string, callback?: () => void) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: "",
  callback: null,
  openModal: (message, callback) =>
    set({ isOpen: true, message, callback }),
  closeModal: () =>
    set((state) => {
      if (state.callback) {
        state.callback(); 
      }
      return { isOpen: false, message: "", callback: null };
    }),
}));