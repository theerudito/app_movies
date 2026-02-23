export interface Content {
  content_id: number;
  title: string;
  type: number;
  url_cover: string;
  year: number;
  gender_id: number;
  season_id: number;
  episodes: Episodes[];
}

export interface Episodes {
  episode_id: number;
  number: number;
  name: string;
  url_video: string;
  season_id: number;
  content_id: number;
}

export const _content: Content = {
  content_id: 0,
  title: "",
  type: 0,
  url_cover: "",
  year: 0,
  gender_id: 0,
  season_id: 0,
  episodes: [
    {
      episode_id: 0,
      number: 1,
      name: "",
      url_video: "",
      season_id: 0,
      content_id: 0,
    },
  ],
};

export interface ContentDTO {
  content_id: number;
  title: string;
  type: string;
  storage_id: string;
  url_cover: string;
  year: number;
  gender_id: number;
  gender: string;
}

export interface ContentFullDTO {
  season_id: number;
  content: ContentDTO;
  seasons: ContentSeasonDTO[];
}

export interface ContentSeasonDTO {
  season_id: number;
  season_name: string;
  episodes: SeasonEpisodeDTO[];
}

export interface SeasonEpisodeDTO {
  episode_id: number;
  number: number;
  name: string;
  storage_id: number;
  url_video: number;
}
