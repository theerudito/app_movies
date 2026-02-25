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
    <div className="flex flex-col fixed top-0 left-0 h-full w-30 bg-gray-900 text-white p-6 space-y-4  shadow-lg">
      <Link
        to="/"
        className="flex items-center justify-center py-4 px-6 rounded-lg bg-purple-500 hover:bg-purple-700 transition duration-300"
      >
        <HomeIcon className="h-6 w-6" />
      </Link>

      <Link
        to="/peliculas"
        onClick={() => {}}
        className="flex items-center justify-center py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        <FilmIcon className="h-6 w-6" />
      </Link>

      <Link
        to="/series"
        onClick={() => {
          changeType(2);
          openContent_Type(false, 0);
        }}
        className="flex items-center justify-center py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        <SparklesIcon className="h-6 w-6" />
      </Link>

      <Link
        to="/animes"
        onClick={() => {
          changeType(1);
          openContent_Type(false, 0);
        }}
        className="flex items-center justify-center py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        <Square3Stack3DIcon className="h-6 w-6" />
      </Link>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto mb-4 flex justify-center w-full">
        <Link
          to="/logout"
          className="flex items-center justify-center py-4 px-6 bg-purple-500 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          <UserIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};
