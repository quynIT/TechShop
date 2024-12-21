import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Sidebar from "../components/NavBar/Sidebar";
import AdminHeader from "../components/NavBar/AdminHeader";
import AdminFooter from "../components/NavBar/AdminFooter";

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* <div className="grid grid-cols-[auto_1fr]  min-h-screen">
        <div className="">
          <Sidebar isOpen={isSidebarOpen} />
          <div
            className={` transition-all duration-300 ${
              isSidebarOpen ? "block " : "hidden"
            }`}
          ></div>
        </div>

        <div className="grid grid-row-[auto_1fr_auto] min-h-screen">
          <div className="">
            <AdminHeader />
          </div>

          <div className="p-10 ">
            <Outlet />
          </div>

          <div className="mt-auto ">
            <AdminFooter />
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-[auto_1fr]  min-h-screen">
        <div className="sticky top-0 h-screen ">
          <Sidebar isOpen={isSidebarOpen} />
          <div
            className={` transition-all  duration-300 ${
              isSidebarOpen ? " block " : "hidden"
            }`}
          ></div>
        </div>

        <div className="grid grid-row-[auto_1fr_auto] min-h-screen">
          <div className="sticky top-0 z-10">
            <AdminHeader />
          </div>

          <div className="p-10 ">
            <Outlet />
          </div>

          <div className="mt-auto ">
            <AdminFooter />
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
