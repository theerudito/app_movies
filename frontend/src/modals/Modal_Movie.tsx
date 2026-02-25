import { useModal } from "../store/useModal";
import { useMovies } from "../store/useMovies";
import { useData } from "../store/useData";
import { Movies } from "../models/Movies";
import { useEffect } from "react";

export const Modal_Movie = () => {
  const { currentModal, CloseModal, OpenModal } = useModal((state) => state);
  const { form_movie, postMovies } = useMovies((state) => state);
  const { gender_list, getGender, getYear, year_list } = useData(
    (state) => state,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    useMovies.setState((state) => ({
      form_movie: {
        ...state.form_movie,
        [name as keyof typeof state.form_movie]: value,
      },
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, selectedIndex, options } = e.target;

    useMovies.setState((state) => {
      let selectedValue: string | number = value;

      if (name === "year") {
        selectedValue = Number(options[selectedIndex].text);
      }

      if (name === "gender_id") {
        selectedValue = Number(value);
      }

      return {
        form_movie: {
          ...state.form_movie,
          [name]: selectedValue,
        },
      };
    });
  };

  function sendData() {
    if (!form_movie.gender_id) {
      alert("Debes seleccionar el genero");
      return;
    }

    const { title, year, url_video, url_cover, gender_id } = form_movie;

    const currentYear = new Date().getFullYear();

    const obj: Movies = {
      movie_id: 0,
      title,
      year: Number(year) === 0 ? currentYear : Number(year),
      url_video,
      url_cover,
      gender_id: gender_id === 0 ? 1 : gender_id,
    };

    postMovies(obj);
  }

  useEffect(() => {
    getGender();
    getYear();
  }, [getGender, getYear]);

  return (
    <div>
      {currentModal === "movie" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <p>AÑADIR PELICULAS</p>
              <i
                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => CloseModal()}
              ></i>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="TITULO"
                name="title"
                value={form_movie.title}
                onChange={handleChangeInput}
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

              <input
                type="text"
                placeholder="URL IMAGEN"
                name="url_cover"
                value={form_movie.url_cover}
                onChange={handleChangeInput}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="text"
                placeholder="URL PELICULA"
                name="url_video"
                value={form_movie.url_video}
                onChange={handleChangeInput}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

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
