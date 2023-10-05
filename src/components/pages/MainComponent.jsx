import React, { useState } from "react";
import UserModal from "./datagridComponents/FormModal";
import DataGridComponent from "./datagridComponents/DataGrid";
import { Grid } from "@mui/material";

const MainDataGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Grid padding={"0 25px 25px 25px"}>
      <DataGridComponent openModal={openModal} />
      <UserModal isOpen={isModalOpen} onClose={closeModal} />
    </Grid>
  );
};

export default MainDataGrid;
