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
  gender_id: number;
  gender: string;
}
