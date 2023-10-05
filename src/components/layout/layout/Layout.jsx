import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "../layout/Layout.css";
import "../../../index.css";

const Layout = () => {
  return (
    <div>
      <Grid className="layout">
        <Grid className="layout-sidebar">
          <SideBar />
        </Grid>
        <Grid className="layout-navbar">
          <Navbar />
        </Grid>
        <Grid className="outlet">
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
