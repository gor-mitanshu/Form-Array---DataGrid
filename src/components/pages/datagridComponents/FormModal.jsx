import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";
import "./DataGrid.css";

const UserModal = ({ isOpen, onClose }) => {
  const [selectedVendorIndex, setSelectedVendorIndex] = useState(null);

  const initialValues = {
    name: "",
    description: "",
    vendors: [
      {
        venderName: "",
        ismain: true,
        variants: [
          {
            varient: "",
            number: "",
          },
        ],
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    vendors: Yup.array().of(
      Yup.object().shape({
        venderName: Yup.string().required("Vendor's Name is required"),
        ismain: Yup.boolean(),
        variants: Yup.array().of(
          Yup.object().shape({
            varient: Yup.string().required("Variant is required"),
            number: Yup.number()
              .required("Number is required")
              .positive("Number must be positive")
              .integer("Number must be an integer"),
          })
        ),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    onClose();
  };

  const handleVendorSelection = (index) => {
    setSelectedVendorIndex(index);
  };

  return (
    <Modal
      open={isOpen}
      // onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "600px",
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
        <div
          style={{
            maxHeight: "590px",
            overflowY: "auto",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="name"
                      as={TextField}
                      fullWidth
                      label="Name"
                      placeholder="Please Enter Your Name"
                    />
                    {touched.name && errors.name && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.name}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="description"
                      as={TextField}
                      fullWidth
                      label="Description"
                      placeholder="Please Enter Your Description"
                    />
                    {touched.description && errors.description && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.description}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray name="vendors">
                      {({ push, remove: removeVendor }) => (
                        <div>
                          {values.vendors.map((vendor, index) => (
                            <div
                              key={index}
                              style={{
                                border: "1px solid",
                                borderRadius: "5px",
                                marginBottom: "10px",
                                padding: "10px",
                              }}
                            >
                              {index > 0 && (
                                <Grid justifyContent={"flex-end"} container>
                                  <IconButton
                                    type="button"
                                    color="error"
                                    onClick={() => removeVendor(index)}
                                  >
                                    <Delete fontSize="large" />
                                  </IconButton>
                                </Grid>
                              )}
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`vendors[${index}].venderName`}
                                    as={TextField}
                                    fullWidth
                                    placeholder="Vendor's Name"
                                  />
                                  {touched.vendors &&
                                    touched.vendors[index] &&
                                    touched.vendors[index].venderName &&
                                    errors.vendors &&
                                    errors.vendors[index] &&
                                    errors.vendors[index].venderName && (
                                      <div
                                        className="error"
                                        style={{ color: "red" }}
                                      >
                                        {errors.vendors[index].venderName}
                                      </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Field
                                      name={`vendors[${index}].ismain`}
                                      as={RadioGroup}
                                    >
                                      <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Is Main"
                                        onClick={() =>
                                          handleVendorSelection(index)
                                        }
                                        checked={selectedVendorIndex === index}
                                      />
                                    </Field>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <FieldArray name={`vendors[${index}].variants`}>
                                {({
                                  push: pushVariant,
                                  remove: removeVariant,
                                }) => (
                                  <div>
                                    {vendor.variants.map((variant, vIndex) => (
                                      <div
                                        key={vIndex}
                                        style={{
                                          marginBottom: "10px",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={4}>
                                            <FormControl sx={{ width: "100%" }}>
                                              <InputLabel>Variant</InputLabel>
                                              <Field
                                                name={`vendors[${index}].variants[${vIndex}].varient`}
                                                as={Select}
                                              >
                                                <MenuItem value={"L"}>
                                                  L
                                                </MenuItem>
                                                <MenuItem value={"XL"}>
                                                  XL
                                                </MenuItem>
                                                <MenuItem value={"XXL"}>
                                                  XXL
                                                </MenuItem>
                                              </Field>
                                              {touched.vendors &&
                                                touched.vendors[index] &&
                                                touched.vendors[index]
                                                  .variants &&
                                                touched.vendors[index].variants[
                                                  vIndex
                                                ] &&
                                                touched.vendors[index].variants[
                                                  vIndex
                                                ].varient &&
                                                errors.vendors &&
                                                errors.vendors[index] &&
                                                errors.vendors[index]
                                                  .variants &&
                                                errors.vendors[index].variants[
                                                  vIndex
                                                ] &&
                                                errors.vendors[index].variants[
                                                  vIndex
                                                ].varient && (
                                                  <div
                                                    className="error"
                                                    style={{ color: "red" }}
                                                  >
                                                    {
                                                      errors.vendors[index]
                                                        .variants[vIndex]
                                                        .varient
                                                    }
                                                  </div>
                                                )}
                                            </FormControl>
                                          </Grid>
                                          <Grid item xs={12} sm={4}>
                                            <Field
                                              name={`vendors[${index}].variants[${vIndex}].number`}
                                              as={TextField}
                                              fullWidth
                                              type="number"
                                              placeholder="Number"
                                            />
                                            {touched.vendors &&
                                              touched.vendors[index] &&
                                              touched.vendors[index].variants &&
                                              touched.vendors[index].variants[
                                                vIndex
                                              ] &&
                                              touched.vendors[index].variants[
                                                vIndex
                                              ].number &&
                                              errors.vendors &&
                                              errors.vendors[index] &&
                                              errors.vendors[index].variants &&
                                              errors.vendors[index].variants[
                                                vIndex
                                              ] &&
                                              errors.vendors[index].variants[
                                                vIndex
                                              ].number && (
                                                <div
                                                  className="error"
                                                  style={{ color: "red" }}
                                                >
                                                  {
                                                    errors.vendors[index]
                                                      .variants[vIndex].number
                                                  }
                                                </div>
                                              )}
                                          </Grid>
                                          <Grid item xs={12} sm={4}>
                                            {vIndex > 0 && (
                                              <IconButton
                                                type="button"
                                                color="error"
                                                onClick={() =>
                                                  removeVariant(vIndex)
                                                }
                                              >
                                                <Delete fontSize="medium" />
                                              </IconButton>
                                            )}
                                            <IconButton
                                              type="button"
                                              color="primary"
                                              onClick={() =>
                                                pushVariant({
                                                  varient: "",
                                                  number: "",
                                                })
                                              }
                                            >
                                              <Add />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          ))}
                          <Grid container justifyContent={"flex-end"}>
                            <IconButton
                              type="button"
                              color="primary"
                              onClick={() =>
                                push({
                                  venderName: "",
                                  ismain: false,
                                  variants: [
                                    {
                                      varient: "",
                                      number: "",
                                    },
                                  ],
                                })
                              }
                            >
                              <Add fontSize="large" />
                            </IconButton>
                          </Grid>
                        </div>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
                <Grid container justifyContent={"center"}>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={onClose}
                    sx={{ marginRight: "8px" }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default UserModal;
