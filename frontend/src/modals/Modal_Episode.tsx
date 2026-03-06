import React, { useEffect } from "react";
import { useModal } from "../store/useModal";
import { useContent } from "../store/useContent";
import { useData } from "../store/useData";

export const Modal_Episode = () => {
    const { currentModal, CloseModal, contendId } = useModal((state) => state);
    const { form_episode, getEpisode, sendEpisode } = useContent((state) => state);
    const { getSeason, season_list } = useData((state) => state);

    useEffect(() => {
        getSeason();

        useContent.setState((state) => ({
            form_episode: state.form_episode ?? {
                content_id: contendId,
                season_id: season_list.length > 0 ? season_list[0].season_id : 0,
                season: "",
                episodes: [],
            },
        }));
    }, [getSeason, contendId, season_list]);

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const seasonId = Number(e.target.value);

        useContent.setState((state) => ({
            form_episode: {
                ...state.form_episode,
                season_id: seasonId,
                episodes: [], 
            },
        }));

        if (seasonId !== 0) {
            getEpisode(contendId, seasonId); // carga episodios solo si hay temporada seleccionada
        }
    };

    const updateEpisode = (
        id: number,
        field: "name" | "number" | "url_video",
        value: string | number
    ) => {
        useContent.setState((state) => ({
            form_episode: {
                ...state.form_episode,
                episodes: state.form_episode.episodes.map((ep) =>
                    ep.episode_id === id ? { ...ep, [field]: value } : ep
                ),
            },
        }));
    };

    const addEpisode = () => {
        useContent.setState((state) => {
            const form = state.form_episode ?? {
                content_id: contendId,
                season_id: 0,
                season: "",
                episodes: [],
            };

            return {
                form_episode: {
                    ...form,
                    episodes: [
                        ...(form.episodes ?? []),
                        {
                            episode_id: Date.now(),
                            number: (form.episodes?.length ?? 0) + 1,
                            name: "",
                            url_video: "",
                        },
                    ],
                },
            };
        });
    };

    const removeEpisode = (id: number) => {
        useContent.setState((state) => ({
            form_episode: {
                ...state.form_episode,
                episodes: state.form_episode.episodes.filter((ep) => ep.episode_id !== id),
            },
        }));
    };

    return (
        <div>
            {currentModal === "episode" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                            <p>AÑADIR EPISODIO DE ANIME</p>
                            <i
                                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                                onClick={() => CloseModal()}
                            ></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Select temporada */}
                            <select
                                name="season_id"
                                value={form_episode?.season_id ?? 0}
                                onChange={handleChangeSelect}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            >
                                <option >SELECCIONA TEMPORADA</option>
                                {season_list.map((item) => (
                                    <option key={item.season_id} value={item.season_id}>
                                        {item.season_name}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={addEpisode}
                                type="button"
                                className="text-purple-500 font-medium"
                            >
                                + Añadir capítulo
                            </button>

                            <div className="flex flex-col gap-4 mt-2 max-h-40 overflow-y-auto scrollbar-purple pr-2">
                                {Array.isArray(form_episode?.episodes) &&
                                    form_episode.episodes.map((episode) => (
                                        <div
                                            key={episode.episode_id}
                                            className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg"
                                        >
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Nombre del episodio"
                                                    value={episode.name}
                                                    onChange={(e) =>
                                                        updateEpisode(episode.episode_id, "name", e.target.value)
                                                    }
                                                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                                />

                                                <input
                                                    type="number"
                                                    placeholder="#"
                                                    value={episode.number}
                                                    onChange={(e) =>
                                                        updateEpisode(episode.episode_id, "number", Number(e.target.value))
                                                    }
                                                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                                />
                                            </div>

                                            <input
                                                type="text"
                                                placeholder="URL del episodio"
                                                value={episode.url_video}
                                                onChange={(e) =>
                                                    updateEpisode(episode.episode_id, "url_video", e.target.value)
                                                }
                                                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeEpisode(episode.episode_id)}
                                                className="text-red-500 text-sm self-end"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                            </div>

                            <button
                                onClick={() => sendEpisode()}
                                className="bg-purple-500 rounded-lg hover:bg-purple-600 text-white py-2 font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                <i className="bi bi-floppy"></i>
                                GUARDAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};