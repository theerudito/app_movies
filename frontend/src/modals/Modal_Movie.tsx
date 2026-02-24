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
        <div className="container_modal">
          <div className="container-modal-body">
            <div className="container-modal-header">
              <p>AÑADIR PELICULAS</p>
              <i className="bi bi-x-lg" onClick={() => CloseModal()}></i>
            </div>

            <div className="container-modal-input">
              <input
                className="input"
                type="text"
                placeholder="TITULO"
                name="title"
                value={form_movie.title}
                onChange={handleChangeInput}
              />

              <select name="year" onChange={handleChangeSelect}>
                <option value="0">SELECIONA UN AÑO</option>
                {year_list.map((item) => (
                  <option key={item.year_id} value={item.year}>
                    {item.year}
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="text"
                placeholder="URL IMAGEN"
                name="url_cover"
                value={form_movie.url_cover}
                onChange={handleChangeInput}
              />

              <input
                className="input"
                type="text"
                placeholder="URL PELICULA"
                name="url_video"
                value={form_movie.url_video}
                onChange={handleChangeInput}
              />

              <div className="contenedor_select">
                <select name="gender_id" onChange={handleChangeSelect}>
                  <option value="0">SELECIONA UN GENERO</option>
                  {gender_list.map((item) => (
                    <option key={item.gender_id} value={item.gender_id}>
                      {item.gender_name}
                    </option>
                  ))}
                </select>

                <div onClick={() => OpenModal("gender")}>
                  <i className="bi bi-plus-circle"></i>
                </div>
              </div>

              <button onClick={() => sendData()}>
                <i className="bi bi-floppy"></i> GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
