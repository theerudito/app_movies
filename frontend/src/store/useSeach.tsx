import {create} from "zustand";

type Data = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    reset: () => void;
    //findData: (value: string) => void;
};

export const useSearch = create<Data>((set) => ({
    searchValue: "",
    setSearchValue: (value: string) => set({ searchValue: value }),
    /*findData: (value: string) => {

    },*/
    reset: () => set({ searchValue: "" }),
}));

