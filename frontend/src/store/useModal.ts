import { create } from "zustand";
import {useMovies} from "./useMovies.ts";

type Data = {
  modalStack: string[];
  currentModal: string | null;
  OpenModal: (name: string) => void;
  CloseModal: () => void;
  reset: () => void;
};

export const useModal = create<Data>((set) => ({
  modalStack: [],
  currentModal: null,

  OpenModal: (name) => {
    set((state) => {
      const newStack = [...state.modalStack, name];
      return {
        modalStack: newStack,
        currentModal: newStack[newStack.length - 1],
      };
    });
  },

  CloseModal: () =>
    set((state) => {
      const newStack = state.modalStack.slice(0, -1);

      useMovies.getState().reset()

      return {
        modalStack: newStack,
        currentModal:
          newStack.length > 0 ? newStack[newStack.length - 1] : null,
      };
    }),

  reset: () => set({ modalStack: [], currentModal: null }, ),
}));
