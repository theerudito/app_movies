import { useEffect } from "react";
import { useModal } from "../store/useModal";
import { useData } from "../store/useData";
import { useContent } from "../store/useContent";
import { Content } from "../models/Contents";

export const Modal_Serie = () => {
  const { currentModal, OpenModal, CloseModal } = useModal((state) => state);
  const {
    gender_list,
    getGender,
    year_list,
    getYear,
    getType,
    season_list,
    getSeason,
  } = useData((state) => state);
  const { form_content, postContent } = useContent((state) => state);

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
    const { name, value, selectedIndex, options } = e.target;

    useContent.setState((state) => {
      let selectedValue: string | number = value;

      if (name === "year") {
        selectedValue = Number(options[selectedIndex].text);
      }

      if (name === "gender_id" || name === "type" || name === "season_id") {
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
    getSeason();
  }, [getGender, getYear, getType, getSeason]);

  const sendData = () => {
    if (
      form_content.type === 0 ||
      form_content.gender_id === 0 ||
      form_content.season_id === 0
    ) {
      alert("Debes seleccionar un genero y tipo de contenido");
      return;
    }

    const { title, url_cover, year, gender_id, season_id } = form_content;

    const currentYear = new Date().getFullYear();

    const obj: Content = {
      content_id: 0,
      title,
      url_cover,
      type: 1,
      year: year === 0 ? currentYear : Number(year),
      gender_id: Number(gender_id) === 0 ? 1 : Number(gender_id),
      season_id: Number(season_id) === 0 ? 1 : Number(season_id),
      episodes: [
        {
          episode_id: 0,
          name: "CAPITULO 1",
          number: 1,
          url_video:
            "https://la.movie/wp-content/uploads/thumbs/0d28895f2d9dec4614559206fc9f36bc_hd.webp",
          season_id: 0,
          content_id: 0,
        },
      ],
    };

    postContent(obj);
  };

  return (
    <div>
      {currentModal === "anime" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <p>AÑADIR ANIME</p>
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

              <div className="flex items-center gap-2">
                <select
                  name="gender_id"
                  onChange={handleChangeSelect}
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
                  className="cursor-pointer text-purple-500 hover:text-purple-600 transition text-xl"
                >
                  <i className="bi bi-plus-circle"></i>
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
