import { Outlet } from "react-router-dom";
import { Component_Header } from "./Component_Header";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Component_Header />

      <main className="grow flex">
        <div className="flex w-full">
          <div className=" bg-gray-800 text-white  overflow-y-auto"></div>

          <div className="flex-1 bg-gray-900 text-white p-6 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
