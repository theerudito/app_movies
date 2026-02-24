import React from "react";
import { useMovies } from "../store/useMovies";

export const Component_Search = () => {
  const { searhMovie, findMovies } = useMovies((state) => state);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    useMovies.getState().setSearchMovie(e.target.value);
  };

  return (
    <div className="container-header-search-box">
      <input
        type="text"
        name="buscar"
        placeholder="Buscar..."
        value={searhMovie}
        onChange={handleChangeInput}
      />
      <button
        className="container-header-search-btn"
        onClick={() => findMovies(searhMovie)}
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};
