import { create } from "zustand";
import {EpisodeDTO, Episodes} from "../models/Episodes";
import {
  Content,
  ContentDTO,
} from "../models/Contents";
import {
    Delete_Content,
    GET_Contents, Get_Episode, GET_Find_Content,
    POST_Content, Post_Episode, PUT_Content, Put_Episode,
} from "../helpers/Fetching_Content";
import { Contents_List } from "../helpers/Data";
import {useModal} from "./useModal.ts";


const initialContent = (): Content => ({
    content_id: 0,
    title: "",
    content_type_id: 0,
    url_cover: "",
    year: 0,
    gender_id: 0,
});

const initialEpisode = (): Episodes => ({
    episode_id: 0,
    number: 0,
    name: "",
    url_video: "",
    season_id: 0,
    content_id: 0,
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
    getEpisode: (id: number, modal: string) => void
    sendEpisode: (obj:Episodes, modal:string) => void

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

        const result = await GET_Contents(location === "home" ? 1 : get().type_content);

        if (result.success && Array.isArray(result.data)) {
            set({list_anime: result.data});
        } else {
            set({list_anime: Contents_List});
        }

    },

    getContentSerie: async (location: string) => {

        const result = await GET_Contents(location === "home" ? 2 : get().type_content);

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
                content_type_id: obj.content_type_id,
                year: obj.year,
                url_cover: obj.url_cover,
                gender_id: obj.gender_id
            },
            isEditing: true
        })

    },

    findContent: async (value:string) => {

        const result = await GET_Find_Content(get().type_content, value.toUpperCase());

        if (result.success && Array.isArray(result.data)) {

            if (get().type_content === 1) {
                set({list_anime  : result.data});
            } else {
                set({list_serie  : result.data});
            }
        } else {

            if (get().type_content === 1) {
                set({list_anime  : Contents_List});
            } else {
                set({list_serie  : Contents_List});
            }
        }
    },

    sendContent: async () => {

        const { form_content } = get();

        console.log(form_content)

        if (form_content.content_id === 0) {
            const result = await POST_Content(form_content);

            if (!result.success) return result.error;
        } else {
            const result = await PUT_Content(form_content);

            if (!result.success) return result.error;
        }
            get().reset();

            if (form_content.content_type_id === 1) {
                get().getContentAnime("");
            } else {
                get().getContentSerie("");
            }
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
    getEpisode: async (id: number, modal: string) => {

        const result = await Get_Episode(id);

        if (result.success && result.data) {

            useModal.getState().OpenModal(modal);

            result.data.forEach((episode: EpisodeDTO) => {
                console.log(episode.name);

                set({
                    form_episode: {
                        episode_id: episode.episode_id,
                        content_id: episode.content_id,
                        name: episode.name,
                        number: episode.number,
                        season_id: episode.season_id,
                        url_video: episode.url_video,
                    },
                    isEditing: true
                });
            });
        }
    },

    sendEpisode: async(obj:Episodes) => {

        const { form_episode } = get();

        if (form_episode.episode_id === 0) {
            const result = await Post_Episode(obj);

            if (!result.success) return result.error;
        } else {
            const result = await Put_Episode(obj);

            if (!result.success) return result.error;
        }

        get().reset();
        get().getContentSerie("");
        get().getContentSerie("");

    },

    reset: () => set({
        form_content: initialContent(),
        form_episode: initialEpisode(),
        isEditing: false,
    }),

    // FORMULARIOS
    form_content: initialContent(),
    form_episode: initialEpisode(),

}));
