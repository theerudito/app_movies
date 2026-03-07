import { create } from "zustand";

type PlayerStore = {
    url: string;
    playing: boolean;
    location: string;
    open_player: (url: string, location: string) => void;
    reset: (goBack: (location: string) => void) => void;
};

export const usePlayer = create<PlayerStore>((set, get) => ({
    url: "",
    playing: false,
    location: "",

    open_player: (url: string, location: string) =>
        set({
            url,
            playing: true,
            location,
        }),

    reset: (goBack) => {
        const { location } = get();
        if (location) {
            goBack(location);
        } else {
            goBack("/");
        }
        set({
            url: "",
            playing: false,
            location: "",
        });
    },
}));