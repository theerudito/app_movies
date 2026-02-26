import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component_Home } from "./components/Component_Home";
import { Component_NotFound } from "./components/Component_NotFound";
import { Component_Movie } from "./components/Component_Movie";
import { Component_Anime } from "./components/Component_Anime";
import { Component_Content } from "./components/Component_Content";
import { Component_Player } from "./components/Component_Player";
import { Layout } from "./components/Componet_Layout";
import { Component_Serie } from "./components/Component_Serie";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Component_Home />} />
            <Route path="/peliculas" element={<Component_Movie />} />
            <Route path="/series" element={<Component_Serie />} />
            <Route path="/animes" element={<Component_Anime />} />
            <Route path="/content/:id" element={<Component_Content />} />
            <Route path="/video" element={<Component_Player />} />
            <Route path="*" element={<Component_NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
