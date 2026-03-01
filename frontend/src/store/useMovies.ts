import { create } from "zustand";
import { Movies, MoviesDTO } from "../models/Movies";
import {
    DELETE_Movie, GET_Find_Movies,
    GET_Movies,
    POST_Movie,
    PUT_Movie,
} from "../helpers/Fetching_Movies";
import { Movies_List } from "../helpers/Data";
import {useModal} from "./useModal.ts";

const initialMovie = (): Movies => ({
    movie_id: 0,
    title: "",
    gender_id: 0,
    year: 0,
    url_cover: "",
    url_video: "",
});

type Data = {
  // LISTADO
  list_movies: MoviesDTO[];

    isEditing: boolean;

  // FUNCIONES
  getMovies: () => void;
  getMovie: (obj:MoviesDTO) => void;
  finMovie: (value:string) => void;
  sendMovies: (obj: Movies) => void;
  deleteMovies: (id: number) => void;
  reset: () => void;

  // FORMULARIO
  form_movie: Movies;
};

export const useMovies = create<Data>((set, get) => ({
    // LISTADO
    list_movies: [],

    isEditing : false,

    // FUNCIONES
    getMovies: async () => {
        const result = await GET_Movies();

        if (result.success && Array.isArray(result.data)) {
            set({list_movies: result.data});
        } else {
            set({list_movies: Movies_List});
        }

        return result.error;
    },

    getMovie: async (obj:MoviesDTO) => {

        useModal.getState().OpenModal("movie")

        set({
            form_movie: {
                movie_id: obj.movie_id,
                title: obj.title,
                gender_id: obj.gender_id,
                year: obj.year,
                url_cover: obj.url_cover,
                url_video: obj.url_video
            },
            isEditing: true
        })
    },

    finMovie: async (value:string) => {

        const result = await GET_Find_Movies(value.toUpperCase());

        if (result.success && Array.isArray(result.data)) {
            set({list_movies: result.data});
        } else {
           get().getMovies()
        }

        return result.error;
    },

    sendMovies: async () => {

        const { form_movie } = get();

        if (form_movie.movie_id === 0) {
            const result = await POST_Movie(form_movie);

            if (!result.success) return result.error;
        } else {
            const result = await PUT_Movie(form_movie);

            if (!result.success) return result.error;
        }

        get().reset();
        get().getMovies();
    },

    deleteMovies: async (id: number) => {
        const result = await DELETE_Movie(id);

        if (result.success) {
            get().getMovies();
            return result.data;
        }

        return result.error;
    },

    reset: () => set({
        form_movie: initialMovie(),
        isEditing: false,

    }),

    // FORMULARIOS
    form_movie: initialMovie(),
}));
