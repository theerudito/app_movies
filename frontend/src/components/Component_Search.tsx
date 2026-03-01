import {useSearch} from "../store/useSeach.tsx";
import {useMovies} from "../store/useMovies.ts";

export const Component_Search = () => {
    const { searchValue, setSearchValue } = useSearch((state) => state);
    const { finMovie } = useMovies((state) => state);

  return (
    <div>
      <div className="max-w-4xl mx-auto flex items-center justify-between bg-gray-800 p-2 rounded-full w-full">
        <input
          type="text"
          name="buscar"
          placeholder="Buscar películas y series..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-4 py-2 text-gray-300 bg-transparent border-2 border-gray-600 rounded-full  dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <button
          className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
          onClick={() => finMovie(searchValue.toUpperCase())}
        >
          <i className="bi bi-search text-lg"></i>
        </button>
      </div>
    </div>
  );
};
