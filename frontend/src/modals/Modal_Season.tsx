import { useData } from "../store/useData";
import { useModal } from "../store/useModal";

export const Modal_Season = () => {
  const { currentModal, CloseModal } = useModal((state) => state);
  const { form_season, postSeason } = useData((state) => state);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    useData.setState((state) => ({
      form_season: {
        ...state.form_season,
        [name]: value,
      },
    }));
  };

  const sendData = async () => {
    if (!form_season.season_name) {
      alert("Debes añadir un titulo de temporada");
      return;
    }

    await postSeason(form_season);
  };

  return (
    <div>
      {currentModal === "season" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <p>AÑADIR TEMPORADAS</p>
              <i
                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => CloseModal()}
              ></i>
            </div>

            <div className="flex flex-col gap-4">
              <input
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                name="season_name"
                value={form_season.season_name}
                onChange={handleChangeInput}
                placeholder="TITULO DE TEMPORADA"
              />

              <button
                onClick={() => sendData()}
                className="w-full  bg-purple-500 rounded-lg hover:bg-purple-600 text-white py-2  font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
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
