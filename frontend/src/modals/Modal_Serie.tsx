import {useEffect} from "react";
import {useModal} from "../store/useModal";
import {useData} from "../store/useData";
import {useContent} from "../store/useContent";
import {Content} from "../models/Contents.ts";

export const Modal_Anime = () => {
    const {currentModal, OpenModal, CloseModal} = useModal((state) => state);
    const {
        gender_list,
        getGender,
        year_list,
        getYear,
        getType,
    } = useData((state) => state);
    const {form_content, postContent} = useContent((state) => state);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        useContent.setState((state) => ({
            form_content: {
                ...state.form_content,
                [name as keyof typeof state.form_content]: value,
            },
        }));
    };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value, selectedIndex, options} = e.target;

        useContent.setState((state) => {
            let selectedValue: string | number = value;

            if (name === "year") {
                selectedValue = Number(options[selectedIndex].text);
            }

            if (name === "gender_id") {
                selectedValue = Number(value);
            }

            return {
                form_content: {
                    ...state.form_content,
                    [name as keyof typeof state.form_content]: selectedValue,
                },
            };
        });
    };

    useEffect(() => {
        getGender();
        getYear();
        getType();
    }, [getGender, getYear, getType]);

    const sendData = () => {

        if (form_content.gender_id === 0 ) {
            alert("Debes seleccionar un genero");
            return;
        }

        const {title, url_cover, year, gender_id} = form_content;

        const currentYear = new Date().getFullYear();

        const obj: Content = {
            content_id: 0,
            title,
            url_cover,
            type: 2,
            year: year === 0 ? currentYear : Number(year),
            gender_id: Number(gender_id) === 0 ? 1 : Number(gender_id),
        };

        postContent(obj);
    };

    return (
        <div>
            {currentModal === "serie" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div
                        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
                        <div
                            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                            <p>AÑADIR SERIE</p>
                            <i
                                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                                onClick={() => CloseModal()}
                            ></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="title"
                                value={form_content.title}
                                onChange={handleChangeInput}
                                placeholder="TITULO"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />

                            <input
                                type="text"
                                name="url_cover"
                                value={form_content.url_cover}
                                onChange={handleChangeInput}
                                placeholder="URL IMAGEN"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />

                            <select
                                name="year"
                                onChange={handleChangeSelect}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            >
                                <option value="0">SELECCIONA UN AÑO</option>
                                {year_list.map((item) => (
                                    <option key={item.year_id} value={item.year}>
                                        {item.year}
                                    </option>
                                ))}
                            </select>

                            <div className="flex items-stretch">

                                <select
                                    name="gender_id"
                                    onChange={handleChangeSelect}
                                    className="flex-1 px-4 py-2
                   rounded-l-md
                   border border-gray-300 dark:border-gray-700 border-r-0
                   bg-white dark:bg-gray-800
                   text-gray-800 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-purple-500
                   transition"
                                >
                                    <option value="0">SELECCIONA UN GENERO</option>
                                    {gender_list.map((item) => (
                                        <option key={item.gender_id} value={item.gender_id}>
                                            {item.gender_name}
                                        </option>
                                    ))}
                                </select>

                                <div
                                    onClick={() => OpenModal("gender")}
                                    className="cursor-pointer
                   bg-purple-500
                   px-3 flex items-center justify-center
                   border-t border-b border-r
                   border-gray-300 dark:border-gray-700
                   rounded-r-md
                   text-white hover:bg-purple-600
                   transition"
                                >
                                    <i className="bi bi-plus-circle text-lg"></i>
                                </div>

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
