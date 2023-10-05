import React, { useState } from "react";
import UserModal from "./datagridComponents/FormModal";
import DataGridComponent from "./datagridComponents/DataGrid";

const MainDataGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <DataGridComponent openModal={openModal} />
      <UserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default MainDataGrid;
