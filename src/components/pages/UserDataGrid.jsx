import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";

const IDataGrid = () => {
  const [products, setProducts] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}`);
      if (!!res) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
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
    <div style={{ padding: "20px" }}>
      <Typography
        textAlign={"center"}
        fontWeight={700}
        color={"Highlight"}
        variant="h5"
        mb={2}
      >
        Website Users List
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" sx={{ marginBottom: "20px" }}>
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
  );
};

export default IDataGrid;
