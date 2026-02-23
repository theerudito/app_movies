import { create } from "zustand";
import { _episodes, EpisodeDTO } from "../models/Episodes";
import {
  _content,
  Content,
  ContentDTO,
  ContentFullDTO,
  SeasonEpisodeDTO,
} from "../models/Contents";
import { GET_Contents, POST_Content } from "../helpers/Fetching_Content";

type Data = {
  // LISTADOS
  list_contents: ContentDTO[];
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
  getContents: () => void;
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
  list_contents: [],
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

  getContents: async () => {
    set({ loading: true });

    const result = await GET_Contents(get().type_content);

    if (result.success && Array.isArray(result.data)) {
      set({ list_contents: result.data });
    } else {
      set({ list_contents: [] });
    }

    set({ loading: false });
  },

  postContent: async (obj) => {
    const result = await POST_Content(obj);

    if (result.success) {
      get().reset();
      await get().getContents();
      return result.data;
    }

    return result.error;
  },

  getContent: async () => {},
  getContent_Season_Episode: async () => {},
  findContent: async () => {},
  putContent: async () => {},
  remove_content: async () => {},

  reset: () => {
    set({
      form_content: _content,
      form_episode: _episodes,
    });
  },
}));
