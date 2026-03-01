import image_1 from "../assets/logo.webp";
import { ContentDTO } from "../models/Contents";
import { MoviesDTO } from "../models/Movies";

export const Movies_List: MoviesDTO[] = [
    {
        movie_id: 0,
        title: "TEST",
        year: 2000,
        url_cover: image_1,
        url_video: "https://pixeldrain.com/api/file/kyjhvCUN",
        gender: "CRIMEN", gender_id: 0
    },
];

export const Contents_List: ContentDTO[] = [
    {
        content_id: 0,
        title: "TEST",
        year: 2000,
        url_cover: image_1,
        type: "as",
        storage_id: "",
        gender_id: 1,
        gender: "CRIMEN",
    }
];


