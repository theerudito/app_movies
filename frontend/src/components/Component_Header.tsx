import { useContent } from "../store/useContent";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { FilmIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";

export const Component_Header = () => {
  const { changeType, openContent_Type } = useContent((state) => state);

  return (
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

      {/* Logout Button at the Bottom */}
      <div className="mt-auto mb-4 flex justify-center w-full">
        <Link
          to="/logout"
          className="flex items-center justify-center py-2 px-2 sm:py-4 sm:px-6 bg-purple-500 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          <UserIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};
