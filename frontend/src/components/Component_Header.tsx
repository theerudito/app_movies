import { useContent } from "../store/useContent";
import { useModal } from "../store/useModal";
import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import { usePlayer } from "../store/usePlayer";
import { CameraIcon } from "@heroicons/react/24/solid";
import { FilmIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";

export const Component_Header = () => {
  const { changeType, openContent_Type } = useContent((state) => state);
  const { isLogin } = useAuth((state) => state);
  const { OpenModal } = useModal((state) => state);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="fixed top-0 left-0 w-64 bg-gray-900 text-white h-full p-6">
        <div className="space-y-6">
          <Link
            to="/"
            className="block py-2 px-4 text-lg hover:text-purple-500"
          >
            Inicio
          </Link>
          <Link
            to="/peliculas"
            onClick={() => usePlayer.setState({ playing: false })}
            className="block py-2 px-4 text-lg hover:text-purple-500"
          >
            Películas
          </Link>
          <Link
            to="/series"
            onClick={() => {
              changeType(2);
              openContent_Type(false, 0);
              usePlayer.setState({ playing: false });
            }}
            className="block py-2 px-4 text-lg hover:text-purple-500"
          >
            Series
          </Link>
          <Link
            to="/animes"
            onClick={() => {
              changeType(1);
              openContent_Type(false, 0);
              usePlayer.setState({ playing: false });
            }}
            className="block py-2 px-4 text-lg hover:text-purple-500"
          >
            Anime
          </Link>
        </div>

        {/* Botones de acción */}
        <div className="mt-5 flex flex-col space-y-4">
          <i className="bi bi-camera-reels"></i>
          <i className="bi bi-film"></i>
          <i className="bi bi-camera-video"></i>
          <i className="bi bi-person"></i>
        </div>
      </div>

      {/* Barra superior (el header) */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 shadow-lg">
        {/* Titulo o marca */}

        {/* Iconos de acción */}
        <div className="flex space-x-4">
          <div onClick={() => OpenModal("movie")} className="cursor-pointer">
            <CameraIcon className="text-xl hover:text-purple-500" />
          </div>

          <div onClick={() => OpenModal("content")} className="cursor-pointer">
            <FilmIcon className="text-xl hover:text-purple-500" />
          </div>

          {isLogin === false ? (
            <div onClick={() => OpenModal("login")} className="cursor-pointer">
              <UserIcon className="text-xl hover:text-purple-500" />
            </div>
          ) : (
            <div className="cursor-pointer">
              <CheckIcon className="text-xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
