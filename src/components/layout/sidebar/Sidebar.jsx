import { Dashboard, TableChart } from "@mui/icons-material";
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const SideBar = () => {
  return (
    <>
      <Grid className="sidebar">
        <Grid item lg={12} sm={6} xs={3}>
          <Toolbar />
          <Divider />

          {/* <NavLink to={"/"} className={"link"}> */}
          <ListItem disablePadding className="sidebar-item">
            <ListItemButton className="sidebar-listitem-btn">
              <ListItemIcon className="sidebar-icon">
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ whiteSpace: "nowrap" }} />
            </ListItemButton>
          </ListItem>
          {/* </NavLink> */}
          <Divider />

          <NavLink to={"/datagrid"} className={"link"}>
            <ListItem disablePadding className="sidebar-item">
              <ListItemButton className="sidebar-listitem-btn">
                <ListItemIcon className="sidebar-icon">
                  <TableChart />
                </ListItemIcon>
                <ListItemText
                  primary="DataGrid"
                  sx={{ whiteSpace: "nowrap" }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};
export default SideBar;
