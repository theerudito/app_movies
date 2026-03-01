import { useEffect } from "react";
import { useModal } from "../store/useModal";
import { useData } from "../store/useData";
import { useContent } from "../store/useContent";
import { Content } from "../models/Contents";

export const Modal_Content = () => {
  const { currentModal, OpenModal, CloseModal } = useModal((state) => state);
  const {
    gender_list,
    getGender,
    year_list,
    getYear
  } = useData((state) => state);
  const { form_content, sendContent, isEditing} = useContent((state) => state);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    useContent.setState((state) => ({
      form_content: {
        ...state.form_content,
        [name as keyof typeof state.form_content]: value,
      },
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        useContent.setState((state) => ({
            form_content: {
                ...state.form_content,
                [name]: name === "year" || name === "gender_id"
                    ? Number(value)
                    : value,
            },
        }));
    };

    useEffect(() => {
    getGender();
    getYear();
  }, [getGender, getYear]);

    const sendData = () => {

        if (form_content.year === 0) {
            alert("Debes seleccionar un año");
            return;
        }

        if (form_content.gender_id === 0) {
            alert("Debes seleccionar un genero");
            return;
        }

        const {title, url_cover, year, gender_id} = form_content;

        const currentYear = new Date().getFullYear();

        const obj: Content = {
            content_id: 0,
            title,
            url_cover,
            type: 1,
            year: year === 0 ? currentYear : Number(year),
            gender_id: Number(gender_id) === 0 ? 1 : Number(gender_id),
        };

        sendContent(obj);
    };

  return (
    <div>
      {currentModal === "content" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <p>{isEditing ? "EDITAR CONTENIDO" : "AÑADIR CONTENIDO"} </p>
              <i
                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => CloseModal()}
              ></i>
            </div>



            <div className="flex flex-col gap-4">

                <select
                    name="content_id"
                    value={form_content.content_id}
                    onChange={handleChangeSelect}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                    <option value="0">SELECCIONA ANIME O SERIE</option>

                    <option  value="1">
                        ANIME
                    </option>
                    <option  value="2">
                        SERIE
                    </option>
                </select>


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
                value={form_content.year}
                onChange={handleChangeSelect}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              >
                <option value="0">SELECCIONA UN AÑO</option>
                {year_list.map((item) => (
                  <option key={item.year_id} value={item.year_id}>
                    {item.year}
                  </option>
                ))}
              </select>

                <div className="flex items-stretch">

                    <select
                        name="gender_id"
                        value={form_content.gender_id}
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
