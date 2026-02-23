export interface Movies {
  movie_id: number;
  title: string;
  year: number;
  url_cover: string;
  url_video: string;
  gender_id: number;
}

export interface MoviesDTO {
  movie_id: number;
  title: string;
  year: number;
  url_cover: string;
  url_video: string;
  gender: string;
}

export const _movies: Movies = {
  movie_id: 0,
  title: "",
  year: 0,
  url_cover: "",
  url_video: "",
  gender_id: 0,
};
