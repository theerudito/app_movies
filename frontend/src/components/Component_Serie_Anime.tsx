import { useEffect } from "react";
import { useContent } from "../store/useContent";
import cover from "../assets/logo.webp";

import { Component_Search } from "./Component_Search";
//import { useNavigate } from "react-router-dom";

export const Component_Serie_Anime = () => {
  const { getContents, list_contents, type_content, changeType } = useContent(
    (state) => state,
  );

  //const nav = useNavigate();

  // const OpenContent = (id: number) => {
  //   if (id > 0) {
  //     nav(`/content/${id}`);
  //   }
  //   return;
  // };

  useEffect(() => {
    changeType(type_content);
    getContents();
  }, [getContents, changeType, type_content]);

  return (
    <div className="app-container">
      <Component_Search />

      <div className="container mx-auto p-6">
        <p className="text-3xl font-bold mb-2">Últimas Series</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {list_contents.map((item) => (
            <div key={item.content_id} className="relative group">
              <img
                src={item.url_cover === "" ? cover : item.url_cover}
                alt={item.url_cover || "Cover"}
                className="w-40 h-60 object-cover rounded-lg"
              />
              <div className="absolute top-0 left-0 w-40 h-60 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-lg flex items-center justify-center">
                <i className="bi bi-play-circle text-white text-4xl"></i>
              </div>
              <div className="absolute top-2 left-25">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
