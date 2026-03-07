export interface Content {
    content_id: number;
    title: string;
    content_type_id: number;
    url_cover: string;
    year: number;
    gender_id: number;
}

export interface ContentDTO {
    content_id: number;
    title: string;
    type: string;
    storage_id: string;
    url_cover: string;
    year: number;
    gender_id: number;
    gender: string;
    content_type_id : number,
    is_complete: boolean
}

export interface ContentFullDTO{
    content: ContentDTO
    seasons: ContentFullSeasonDTO[]
}

export interface ContentFullSeasonDTO{
    season_id: number,
    season_name: string,
    episodes: ContentFullEpisodeDTO[]
}

export interface ContentFullEpisodeDTO{
    episode_id: number,
    number: number,
    name: string,
    url_video: string
}
