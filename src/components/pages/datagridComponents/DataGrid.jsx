import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const DataGridComponent = ({ openModal }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}`);
        if (!!res) {
          setProducts(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerClassName: "header",
      description: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      description: "Description",
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
      description: "Vendor",
      valueGetter: (body) => {
        const rowLength = body.row.vendors.length;
        return rowLength;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "Actions",
      flex: 1,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete color={"error"} />}
          label="Delete"
        />,
        <GridActionsCellItem icon={<Edit color="info" />} label="Edit" />,
      ],
    },
  ];

  return (
    <div>
      <Typography
        textAlign={"center"}
        fontWeight={700}
        color={"Highlight"}
        variant="h5"
        my={2}
      >
        Website Users List
      </Typography>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "15px",
          }}
        >
          <Button variant="contained" onClick={openModal}>
            Add User
          </Button>
        </div>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            autoHeight
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default DataGridComponent;
