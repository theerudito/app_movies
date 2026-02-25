import { Outlet } from "react-router-dom";
import { Component_Header } from "./Component_Header";
import { Component_Footer } from "./Component_Footer";

export const Layout = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Component_Header />

      <main className="w-full mb-10 min-h-screen overflow-y-auto bg-gray-950 p-4">
        <Outlet />
      </main>

      <Component_Footer />
    </div>
  );
};
