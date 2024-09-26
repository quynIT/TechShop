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
      <Sidebar />

      <div className="relative md:w-10/12 float-right bg-blueGray-100 sr-only">
        <AdminNavbar />
        {/* Header */}
        <AdminHeader />
        <div className="px-4 md:px-10 mx-auto -m-24 dark">
          {/* <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/tables" element={<Tables />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          </Routes> */}
          <Outlet />
          <AdminFooter />
        </div>
      </div>
    </>
  );
};
export default Admin;
