import { useEffect, useState } from "react";
import { useContent } from "../store/useContent";
import "../styles/Styles_Content.css";
import { useParams } from "react-router-dom";

export const Component_Content = () => {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const { getContent, list_content } = useContent((state) => state);
  const { id } = useParams<{ id: string }>();

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setSelectedSeasonIndex(index);
  };

  useEffect(() => {
    getContent(Number(id));
  }, [getContent, id]);

  return (
    <div className="anime-viewer">
      <>
        <div className="anime-main">
          <div className="anime-image">
            <img src={list_content?.content.url_cover} />
          </div>

          <div className="anime-info">
            <h5>{list_content?.content.title}</h5>
            <p>{list_content?.content.year}</p>
            <p>{list_content?.content.gender}</p>
            <select onChange={handleChangeSelect}>
              {list_content?.seasons.map((season, index) => (
                <option key={index} value={season.season_id}>
                  {season.season_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="episode-scroll">
          <div className="episode-grid">
            {list_content?.seasons[selectedSeasonIndex].episodes.map(
              (item, key) => (
                <div key={key} className="episode">
                  <div className="episode-image">
                    <img src={list_content?.content.url_cover} />
                    <div className="play-button">
                      <i className="bi bi-play-circle"></i>
                    </div>
                  </div>
                  <p className="episode-title">{item.name}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </>
    </div>
  );
};
