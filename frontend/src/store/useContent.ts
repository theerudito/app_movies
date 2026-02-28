import { create } from "zustand";
import { _episodes, EpisodeDTO } from "../models/Episodes";
import {
  _content,
  Content,
  ContentDTO,
  ContentFullDTO,
  SeasonEpisodeDTO,
} from "../models/Contents";
import {
  Delete_Content,
  GET_Content,
  GET_Contents,
  POST_Content,
} from "../helpers/Fetching_Content";
import { Contents_List } from "../helpers/Data";

type Data = {
  // LISTADOS
  list_anime: ContentDTO[];
  list_serie: ContentDTO[];
  list_content: ContentFullDTO | null;
  list_contenten_season: SeasonEpisodeDTO | null;
  loading: boolean;
  contend_id: number;

  // DATOS
  episode_id: number;
  type_content: number;
  openContent: boolean;

  // FUNCIONES
  openContent_Type: (open: boolean, id: number) => void;
  changeType: (type: number) => void;
  getContentAnime: (location: string) => void;
  getContentSerie: (location: string) => void;
  getContent: (id: number) => void;
  getContent_Season_Episode: (id: number, seasonid: number) => void;
  findContent: (type: number, value: string) => void;
  postContent: (obj: Content) => void;
  putContent: (obj: Content) => void;
  remove_content: (id: number) => void;
  reset: () => void;

  // FORMULARIOS
  form_content: Content;
  form_episode: EpisodeDTO;
};

export const useContent = create<Data>((set, get) => ({
  // LISTADOS
  list_anime: [],
  list_serie: [],
  list_content: null,
  list_contenten_season: null,
  loading: false,

  // DATOS
  episode_id: 0,
  type_content: 1,
  contend_id: 0,
  openContent: false,

  // FORMULARIOS
  form_content: _content,
  form_episode: _episodes,

  // FUNCIONES
  openContent_Type: (open, id) => {
    set({ openContent: open, contend_id: id });
  },

  changeType: (type) => {
    set({ type_content: Number(type) });
  },

  getContentAnime: async (location: string) => {
    set({ loading: true });

    const result = await GET_Contents(
      location === "home" ? 1 : get().type_content,
    );

    if (result.success && Array.isArray(result.data)) {
      set({ list_anime: result.data });
    } else {
      set({ list_anime: Contents_List });
    }

    set({ loading: false });
  },

  getContentSerie: async (location: string) => {
    set({ loading: true });

    const result = await GET_Contents(
      location === "home" ? 2 : get().type_content,
    );

    if (result.success && Array.isArray(result.data)) {
      set({ list_serie: result.data });
    } else {
      set({ list_serie: Contents_List });
    }

    set({ loading: false });
  },

  getContent: async (id: number) => {
    set({ loading: true });

    const result = await GET_Content(id);

    if (result.success && result.data) {
      set({ list_content: result.data });
    } else {
      set({ list_serie: Contents_List });
    }

    set({ loading: false });
  },

  postContent: async (obj) => {
    const result = await POST_Content(obj);

    if (result.success) {
      get().reset();

      if (obj.type === 1) {
        await get().getContentAnime;
      } else {
        await get().getContentSerie;
      }

      return result.data;
    }

    return result.error;
  },

  getContent_Season_Episode: async () => {},
  findContent: async () => {},
  putContent: async () => {},
  remove_content: async (id: number) => {
    const result = await Delete_Content(id);

    if (result.success) {
      await get().getContentAnime;
      await get().getContentSerie;
      return result.data;
    }

    return result.error;
  },

  reset: () => {
    set({
      form_content: _content,
      form_episode: _episodes,
    });
  },
}));
