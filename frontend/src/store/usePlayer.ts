import { create } from "zustand";

type PlayerStore = {
  url: string;
  playing: boolean;
  open_player: (url: string) => void;
  close_player: () => void;
  reset: () => void;
};

export const usePlayer = create<PlayerStore>((set) => ({
  url: "",
  playing: false,

  open_player: (url: string) =>
    set({
      url,
      playing: true,
    }),

  close_player: () =>
    set({
      playing: false,
    }),

  reset: () =>
    set({
      url: "",
      playing: false,
    }),
}));
