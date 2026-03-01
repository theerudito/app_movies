import { create } from "zustand";
import {_episodes,Episodes} from "../models/Episodes";
import {
  Content,
  ContentDTO,
} from "../models/Contents";
import {
    Delete_Content,
    GET_Contents,
    POST_Content,
} from "../helpers/Fetching_Content";
import { Contents_List } from "../helpers/Data";
import {useModal} from "./useModal.ts";

const initialContent = (): Content => ({
    content_id: 0,
    title: "",
    type: 0,
    url_cover: "",
    year: 0,
    gender_id: 0,
});

type Data = {
  // LISTADOS
  list_anime: ContentDTO[];
  list_serie: ContentDTO[];

  isEditing: boolean;
  contend_id: number;

  // DATOS
  episode_id: number;
  type_content: number;
  openContent: boolean;

  // FUNCIONES
  openContent_Type: (open: boolean, id: number) => void;
  changeType: (type: number) => void;

  // CONTENT
  getContentAnime: (location: string) => void;
  getContentSerie: (location: string) => void;
  getContent: (obj:ContentDTO, modal:string) => void;
  findContent: (value:string) => void;
  sendContent: (obj: Content) => void;
  removeContent: (id: number) => void;

  // EPISODE
  reset: () => void;

  // FORMULARIOS
  form_content: Content;
  form_episode: Episodes;
};

export const useContent = create<Data>((set, get) => ({
    // LISTADOS
    list_anime: [],
    list_serie: [],

    isEditing: false,

    // DATOS
    episode_id: 0,
    type_content: 1,
    contend_id: 0,
    openContent: false,

    // FUNCIONES
    openContent_Type: (open, id) => {
        set({openContent: open, contend_id: id});
    },

    changeType: (type) => {
        set({type_content: Number(type)});
    },

    // CONTENT
    getContentAnime: async (location: string) => {

        const result = await GET_Contents(
            location === "home" ? 1 : get().type_content,
        );

        if (result.success && Array.isArray(result.data)) {
            set({list_anime: result.data});
        } else {
            set({list_anime: Contents_List});
        }

    },

    getContentSerie: async (location: string) => {

        const result = await GET_Contents(
            location === "home" ? 2 : get().type_content,
        );

        if (result.success && Array.isArray(result.data)) {
            set({list_serie: result.data});
        } else {
            set({list_serie: Contents_List});
        }

    },

    getContent: async (obj: ContentDTO, modal: string) => {

        useModal.getState().OpenModal(modal)

        set({
            form_content: {
                content_id: obj.content_id,
                title: obj.title,
                type: 1,
                year: obj.year,
                url_cover: obj.url_cover,
                gender_id: obj.gender_id
            },
            isEditing: true
        })

    },

    findContent: async () => {
    },

    sendContent: async (obj: Content) => {
        const result = await POST_Content(obj);

        if (result.success) {
            get().reset();

            if (obj.type === 1) {
                get().getContentAnime("");
            } else {
                get().getContentSerie("");
            }

            return result.data;
        }

        return result.error;
    },

    removeContent: async (id: number) => {
        const result = await Delete_Content(id);

            if ( get().type_content === 1) {
                if (result.success) {
                    get().getContentAnime("anime");
                    return result.data;
                }
            } else {
                if (result.success) {
                    get().getContentSerie("serie");
                    return result.data;
                }
            }

        return result.error;
    },

    // EPISODE
    reset: () => set({
        form_content: initialContent(),
        isEditing: false,

    }),

    // FORMULARIOS
    form_content: initialContent(),
    form_episode: _episodes,

}));
