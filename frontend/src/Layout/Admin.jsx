import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Sidebar from "../components/NavBar/Sidebar";
import AdminNavbar from "../components/NavBar/AdminNavbar";
import AdminHeader from "../components/NavBar/AdminHeader";
import Dashboard from "../pages/admin/Dashboard";
import Settings from "../pages/admin/Setting";
import Tables from "../pages/admin/Table";
import AdminFooter from "../components/NavBar/AdminFooter";

const Admin = () => {
  return (
    <>
      <div className=" flex min-h-screen">
        {/* Sidebar bên trái, luôn cố định */}
        <div className=" w-1/6 block bg-gray-900  text-white">
          <Sidebar />
        </div>

        {/* Phần nội dung bên phải */}
        <div className="block  w-screen float-right">
          {/* Header cố định */}
          <div className="w-full">
            <AdminHeader className="w-full h-16 bg-gray-800 text-white fixed top-0 z-10" />
          </div>

          {/* Nội dung chính có thể cuộn, với khoảng cách từ header */}
          <div className="flex-grow pt-20 pb-16 overflow-y-auto">
            <div className="px-8 md:px-12 lg:px-16 w-full">
              <Outlet />
            </div>
          </div>

          {/* Footer cố định */}
          <div className="w-full ">
            <AdminFooter className="w-full h-16 bg-gray-800 text-white bottom-0 z-10" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
