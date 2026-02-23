import image_1 from "../assets/logo.webp";
import { Episodes } from "../models/Episodes";
import { MoviesDTO } from "../models/Movies";

export const Movies_List: MoviesDTO[] = [
  {
    movie_id: 1,
    title: "MAN OF HONOR",
    year: 2000,
    url_cover: image_1,
    url_video: "https://pixeldrain.com/api/file/kyjhvCUN",
    gender: "CRIMEN",
  },
];

export const Contents_List: MoviesDTO[] = [
  {
    movie_id: 1,
    title: "MAN OF HONOR",
    year: 2000,
    url_cover: image_1,
    url_video: "https://pixeldrain.com/api/file/kyjhvCUN",
    gender: "CRIMEN",
  },
];

export const Episode_List: Episodes[] = [
  {
    episode_id: 1,
    season_id: 1,
    episode_number: 1,
    episode_name: "TITLE 1",
    episode_url: "",
  },
  {
    episode_id: 2,
    season_id: 1,
    episode_number: 2,
    episode_name: "TITLE 2",
    episode_url: "",
  },
];
