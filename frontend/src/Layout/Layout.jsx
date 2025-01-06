import React from "react";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import FallingLeaves from "../pages/FallingLeaves";

const Layout = () => {
  return (
    <div>
      <FallingLeaves />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
