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
      <div className="grid grid-cols-[auto_1fr] min-h-screen w-full">
        {/* Sidebar */}
        <div className="sticky top-0 h-screen bg-gray-800">
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        {/* Content Area */}
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen ">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white shadow">
            <AdminHeader />
          </div>

          {/* Main Content */}
          <div className="relative w-full p-10 bg-gray-100 overflow-auto  min-h-[calc(100vh-6rem)]">
           
              {/* Nội dung chính */}
              <Outlet />
           
          </div>

          {/* Footer */}
          
            <div className="sticky shadow ">
              <AdminFooter />
            </div>
          
        </div>
      </div>
    </>
  );
};
export default Admin;
