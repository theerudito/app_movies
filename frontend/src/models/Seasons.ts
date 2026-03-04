import { EpisodeDTO } from "./Episode.ts";

export interface Season {
  season_id: number;
  season_name: string;
}

export interface SeasonDTO {
  season_id: number;
  season_name: string;
  episodes: EpisodeDTO[];
}

export const _season: Season = {
  season_id: 0,
  season_name: "",
};
