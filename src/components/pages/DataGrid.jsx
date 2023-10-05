import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Formik, Field, Form } from "formik";

const DataGrids = () => {
  const [products, setProducts] = useState([]);
  const [newField, setNewField] = useState([
    {
      name: "",
      description: "",
      vendors: [
        {
          venderName: "",
          ismain: false,
          varient: "",
          number: "",
        },
      ],
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleAddVendor = () => {
    setNewField([
      ...newField,
      {
        vendors: [
          {
            venderName: "",
            ismain: false,
            varient: "",
            number: "",
          },
        ],
      },
    ]);
  };

  const handleAdd = (index) => {
    const updatedForm = [...newField];
    const updatedForms = updatedForm[index].vendors;
    console.log(updatedForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newField);
  };
  return (
    <div>
      <Typography
        textAlign={"center"}
        fontWeight={700}
        color={"Highlight"}
        variant="h5"
        mb={2}
      >
        Website Users List
      </Typography>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ marginBottom: "20px" }}
          >
            Add User
          </Button>
        </div>
        <Modal
          open={open}
          //   onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              //   height:"100%",
              bgcolor: "background.paper",
              border: "2px solid",
              boxShadow: 24,
              borderRadius: "10px",
              p: 4,
            }}
          >
            <Typography variant="h5" textAlign={"center"} mb={2}>
              Form
            </Typography>
            <Formik
              initialValues={{ name: "", email: "" }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={"Name"}
                      placeholder="Please Enter Your Name"
                      id="name"
                      name="name"
                      value={newField.name}
                      onChange={(e) => {
                        setNewField(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={"Description"}
                      placeholder="Please Enter Your Description"
                      id="description"
                      name="description"
                      value={newField.description}
                      onChange={(e) => {
                        setNewField(e.target.value);
                      }}
                    />
                  </Grid>
                  {newField?.map((v, ixd) => {
                    return (
                      <Box
                        border={1}
                        key={ixd}
                        borderRadius={2}
                        width={"100%"}
                        my={2}
                        p={2}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label={"Vender's Name"}
                              placeholder="Please Enter Vender's Name"
                              id="venderName"
                              name="venderName"
                              value={v.vendors.venderName}
                              onChange={(e) => setNewField(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                              >
                                <FormControlLabel
                                  value={v.vendors.ismain}
                                  control={<Radio />}
                                  label="Is Main"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>

                          {newField?.venderName.map((v, i) => {
                            return (
                              <>
                                <Grid key={i}>
                                  <Grid xs={5.5} item>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">
                                        Varient
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        value={v.vendors.varient}
                                        onChange={(e) =>
                                          setNewField(e.target.value)
                                        }
                                      >
                                        <MenuItem value={"L"}>L</MenuItem>
                                        <MenuItem value={"XL"}>XL</MenuItem>
                                        <MenuItem value={"XXL"}>XXL</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={5.5}>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      label={"Number"}
                                      placeholder="Please Enter Number"
                                      id="number"
                                      name="number"
                                      value={v.vendors.number}
                                      onChange={(e) => e.target.value}
                                    />
                                  </Grid>
                                </Grid>
                              </>
                            );
                          })}
                          <Grid item xs={1}>
                            <IconButton
                              type="button"
                              fullWidth
                              color="primary"
                              onClick={handleAdd}
                            >
                              <Add />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                  <Grid container justifyContent={"flex-end"}>
                    <IconButton
                      fullWidth
                      color="primary"
                      onClick={handleAddVendor}
                    >
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
              </Form>
            </Formik>

            <Grid display={"flex"} justifyContent={"center"}>
              <Button
                sx={{ marginRight: "15px" }}
                type="button"
                onClick={handleClose}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Box>
        </Modal>
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
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default DataGrids;
