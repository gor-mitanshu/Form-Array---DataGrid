import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <Grid className="navbar">
        <AppBar className="appbar">
          <Toolbar className="toolbar-navbar">
            <MenuIcon className="menu-icon" />
            <Grid className="navbar-name-content-center">
              <Typography className="navbar-title">Task</Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Navbar;
