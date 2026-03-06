import { create } from "zustand";
import {useMovies} from "./useMovies.ts";
import {useContent} from "./useContent.ts";

type Data = {
  modalStack: string[];
  currentModal: string | null;
  OpenModal: (name: string, contentId?: number) => void;
  CloseModal: () => void;
  reset: () => void;
  contendId: number;
};

export const useModal = create<Data>((set) => ({
  modalStack: [],
  currentModal: null,
    contendId: 0,

    OpenModal: (name, contentId = 0) => {
        set((state) => {
            const newStack = [...state.modalStack, name];
            return {
                modalStack: newStack,
                currentModal: newStack[newStack.length - 1],
                contendId: contentId,
            };
        });
    },

  CloseModal: () =>
    set((state) => {
      const newStack = state.modalStack.slice(0, -1);

      useMovies.getState().reset()
        useContent.getState().reset()

      return {
        modalStack: newStack,
        currentModal:
          newStack.length > 0 ? newStack[newStack.length - 1] : null,
      };
    }),

  reset: () => set({ modalStack: [], currentModal: null }, ),
}));
