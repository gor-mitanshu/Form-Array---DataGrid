import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    alert("You have logged out");
  };
  return (
    <div>
      <Grid className="navbar">
        <AppBar className="appbar">
          <Toolbar className="toolbar-navbar">
            <MenuIcon className="menu-icon" />
            <Grid className="navbar-name-content-center">
              <Typography className="navbar-title">Task</Typography>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Navbar;
