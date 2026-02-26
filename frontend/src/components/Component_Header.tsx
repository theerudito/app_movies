import { useContent } from "../store/useContent";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  PlayCircleIcon,
  PlayIcon,
  PlusIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { FilmIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { Modal_Season } from "../modals/Modal_Season";
import { useModal } from "../store/useModal";
import { useAuth } from "../store/useAuth";
import { PlayPauseIcon } from "@heroicons/react/20/solid";
import { Modal_Login } from "../modals/Modal_Login";
import { Modal_Gender } from "../modals/Modal_Gender";
import { Modal_Movie } from "../modals/Modal_Movie";
import { Modal_Anime } from "../modals/Modal_Serie";
import { Modal_Serie } from "../modals/Modal_Anime";

export const Component_Header = () => {
  const { changeType, openContent_Type } = useContent((state) => state);
  const { OpenModal } = useModal((state) => state);
  const { isLogin } = useAuth((state) => state);

  return (
    <>
      <div className="flex flex-col h-screen w-fit bg-slate-900 text-white sm:py-4 py-2 sm:px-4 px-2 gap-2  shadow-lg z-20">
        <Link
          to="/"
          className="flex items-center justify-center py-2 px-2 sm:py-4 sm:px-6 rounded-lg bg-purple-500 hover:bg-purple-700 transition duration-300"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>

        <Link
          to="/peliculas"
          onClick={() => {}}
          className="flex items-center justify-center sm:py-4 py-4 sm:px-2 px-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          <FilmIcon className="h-6 w-6" />
        </Link>

        <Link
          to="/series"
          onClick={() => {
            changeType(2);
            openContent_Type(false, 0);
          }}
          className="flex items-center justify-center sm:py-2 py-4 sm:px-2 px-1 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          <SparklesIcon className="h-6 w-6" />
        </Link>

        <Link
          to="/animes"
          onClick={() => {
            changeType(1);
            openContent_Type(false, 0);
          }}
          className="flex items-center justify-center sm:py-1 py-4 sm:px-2 px-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          <Square3Stack3DIcon className="h-6 w-6" />
        </Link>

        <div className="mt-auto mb-4 flex flex-col items-center gap-4 w-full">
          {isLogin === false && (
            <>
              <PlayIcon
                className="h-9 w-9 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={() => OpenModal("movie")}
              />
              <PlayCircleIcon
                className="h-9 w-9 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={() => OpenModal("serie")}
              />
              <PlayPauseIcon
                className="h-9 w-9 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={() => OpenModal("anime")}
              />
              <PlusIcon
                className="h-9 w-9 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={() => OpenModal("gender")}
              />
              <PlusIcon
                className="h-9 w-9 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={() => OpenModal("season")}
              />
            </>
          )}
        </div>

        <div
          className="mt-auto mb-4 flex justify-center w-full"
          onClick={() => OpenModal("login")}
        >
          <Link
            to="/"
            className="flex items-center justify-center py-2 px-2 sm:py-4 sm:px-6 bg-purple-500 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <Modal_Season />
      <Modal_Login />
      <Modal_Gender />
      <Modal_Movie />
      <Modal_Anime />
      <Modal_Serie />
    </>
  );
};
