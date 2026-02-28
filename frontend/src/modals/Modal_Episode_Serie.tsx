import React, { useEffect, useState } from "react";
import { useModal } from "../store/useModal";
import { useContent } from "../store/useContent";
import { Episodes } from "../models/Contents";
import {useData} from "../store/useData.ts";

export const Modal_Episode_Serie = () => {
    const { currentModal, CloseModal } = useModal((state) => state);
    const [chapters, setChapters] = useState<Episodes[]>([]);
    const { getContent, list_anime } = useContent((state) => state);
    const { getSeason, season_list } = useData((state) => state);

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, selectedIndex, options } = e.target;

        useContent.setState((state) => {
            let selectedValue: string | number = value;

            if (name === "content_id") {
                selectedValue = Number(options[selectedIndex].text);
            }

            if (name === "season_id") {
                selectedValue = Number(options[selectedIndex].text);
            }

            return {
                form_content: {
                    ...state.form_content,
                    [name as keyof typeof state.form_content]: selectedValue,
                },
            };
        });
    };

    const addChapter = () => {
        const newEpisode: Episodes = {
            episode_id: Date.now(),
            number: chapters.length + 1,
            name: "",
            url_video: "",
            season_id: 0,
            content_id: 0,
        };

        setChapters((prev) => [...prev, newEpisode]);
    };

    const handleChapterChange = (
        id: number,
        field: keyof Episodes,
        value: string,
    ) => {
        setChapters((prev) =>
            prev.map((ep) =>
                ep.episode_id === id
                    ? {
                        ...ep,
                        [field]: field === "number" ? Number(value) : value,
                    }
                    : ep,
            ),
        );
    };

    const removeChapter = (id: number) => {
        const filtered = chapters
            .filter((ep) => ep.episode_id !== id)
            .map((ep, index) => ({
                ...ep,
                episode_number: index + 1,
            }));

        setChapters(filtered);
    };

    useEffect(() => {
        getSeason()
        getContent(2)
    }, [getContent, getSeason]);

    const sendData = () => {

    };

    return (
        <div>
            {currentModal === "episode_serie" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                            <p>AÑADIR EPISODIO DE SERIE</p>
                            <i
                                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                                onClick={() => CloseModal()}
                            ></i>
                        </div>

                        <div className="flex flex-col gap-4">

                            <select
                                name="content_id"
                                onChange={handleChangeSelect}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            >
                                <option value="0">SELECCIONA UN TITULO</option>
                                {list_anime.map((item) => (
                                    <option key={item.content_id} value={item.content_id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="season_id"
                                onChange={handleChangeSelect}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            >
                                <option value="0">SELECCIONA UNA TEMPORADA</option>
                                {season_list.map((item) => (
                                    <option key={item.season_id} value={item.season_id}>
                                        {item.season_name}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={addChapter}
                                className="text-purple-500 font-medium"
                            >
                                + Añadir capítulo
                            </button>

                            <div className="flex flex-col gap-4 mt-2 max-h-40 overflow-y-auto scrollbar-purple pr-2">
                                {chapters.map((chapter) => (
                                    <div
                                        key={chapter.episode_id}
                                        className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg"
                                    >

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Nombre del episodio"
                                                value={chapter.name}
                                                onChange={(e) =>
                                                    handleChapterChange(
                                                        chapter.episode_id,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            />

                                            <input
                                                type="number"
                                                placeholder="#"
                                                value={chapter.number}
                                                onChange={(e) =>
                                                    handleChapterChange(
                                                        chapter.episode_id,
                                                        "number",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-20 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            />
                                        </div>

                                        {/* URL debajo */}
                                        <input
                                            type="text"
                                            placeholder="URL del episodio"
                                            value={chapter.url_video}
                                            onChange={(e) =>
                                                handleChapterChange(
                                                    chapter.episode_id,
                                                    "url_video",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeChapter(chapter.episode_id)}
                                            className="text-red-500 text-sm self-end"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => sendData()}
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
