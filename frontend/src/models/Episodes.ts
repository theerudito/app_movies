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
    content_id: number;
}
