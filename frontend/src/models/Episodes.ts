export interface Episodes {
    episode_id: number;
    number: number;
    name: string;
    url_video: string;
    season_id: number;
    content_id: number;
}

export interface EpisodeDTO {
    episode_id: number;
    number: number;
    name: string;
    url_video: string;
    season_id: number;
    season: string;
}

export const _episodes: Episodes = {
    episode_id: 0,
    number: 0,
    name: "",
    url_video: "",
    season_id: 0,
    content_id: 0,
};
