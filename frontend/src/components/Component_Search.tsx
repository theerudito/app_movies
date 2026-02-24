import React from "react";
import { useMovies } from "../store/useMovies";

export const Component_Search = () => {
  const { searhMovie, findMovies } = useMovies((state) => state);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    useMovies.getState().setSearchMovie(e.target.value);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto flex items-center justify-between bg-gray-800 p-2 rounded-full w-full">
        <input
          type="text"
          name="buscar"
          placeholder="Buscar películas y series..."
          value={searhMovie}
          onChange={handleChangeInput}
          className="w-full px-4 py-2 text-gray-300 bg-transparent border-2 border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
          onClick={() => findMovies(searhMovie)}
        >
          <i className="bi bi-search text-lg"></i>
        </button>
      </div>
    </div>
  );
};
