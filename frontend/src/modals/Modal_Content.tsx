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
    getYear,
    type_list,
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

      if (name === "content_year") {
        selectedValue = Number(options[selectedIndex].text);
      }

      if (name === "gender_id" || name === "content_type") {
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

    const { title, url_cover, type, year, gender_id, season_id } = form_content;

    const currentYear = new Date().getFullYear();

    const obj: Content = {
      content_id: 0,
      title,
      url_cover,
      type: Number(type),
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
          season_id,
          content_id: 0,
        },
      ],
    };

    postContent(obj);
  };

  return (
    <div>
      {currentModal === "content" && (
        <div className="container_modal">
          <div className="container-modal-body">
            <div className="container-modal-header">
              <p>AÑADIR SERIE O ANIME</p>
              <i className="bi bi-x-lg" onClick={() => CloseModal()}></i>
            </div>
            <div className="container-modal-input">
              <input
                className="input"
                type="text"
                name="title"
                value={form_content.title}
                onChange={handleChangeInput}
                placeholder="TITULO"
              />

              <select name="type" onChange={handleChangeSelect}>
                <option value="0">SELECIONA UN TIPO CONTENIDO</option>
                {type_list.map((item) => (
                  <option key={item.content_type} value={item.content_type}>
                    {item.content_type_title}
                  </option>
                ))}
              </select>

              <select name="season_id" onChange={handleChangeSelect}>
                <option value="0">SELECIONA UNA TEMPORADA</option>
                {season_list.map((item) => (
                  <option key={item.season_id} value={item.season_id}>
                    {item.season_name}
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="text"
                name="url_cover"
                value={form_content.url_cover}
                onChange={handleChangeInput}
                placeholder="URL IMAGEN"
              />

              <select name="year" onChange={handleChangeSelect}>
                <option value="0">SELECIONA UN AÑO</option>
                {year_list.map((item) => (
                  <option key={item.year_id} value={item.year}>
                    {item.year}
                  </option>
                ))}
              </select>

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
