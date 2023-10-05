import React from "react";
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

const UserModal = ({ isOpen, onClose }) => {
  const initialValues = {
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
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    vendors: Yup.array().of(
      Yup.object().shape({
        venderName: Yup.string().required("Vendor's Name is required"),
        ismain: Yup.boolean(),
        varient: Yup.string().required("Variant is required"),
        number: Yup.number()
          .required("Number is required")
          .positive("Number must be positive")
          .integer("Number must be an integer"),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={"Name"}
                    placeholder="Please Enter Your Name"
                    id="name"
                    name="name"
                  />
                  {touched.name && errors.name && (
                    <div className="error">{errors.name}</div>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={"Description"}
                    placeholder="Please Enter Your Description"
                    id="description"
                    name="description"
                  />
                  {touched.description && errors.description && (
                    <div className="error">{errors.description}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FieldArray name="vendors">
                    {({ push, remove }) => (
                      <div>
                        {values.vendors.map((vendor, index) => (
                          <Box
                            key={index}
                            border={1}
                            borderRadius={2}
                            width={"100%"}
                            my={2}
                            p={2}
                            position="relative"
                          >
                            {index > 0 && (
                              <IconButton
                                type="button"
                                color="primary"
                                onClick={() => remove(index)}
                                sx={{ position: "absolute", top: 0, right: 0 }}
                              >
                                <Delete />
                              </IconButton>
                            )}
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  placeholder="Vendor's Name"
                                  name={`vendors[${index}].venderName`}
                                />
                                {touched.vendors &&
                                  touched.vendors[index] &&
                                  touched.vendors[index].venderName &&
                                  errors.vendors &&
                                  errors.vendors[index] &&
                                  errors.vendors[index].venderName && (
                                    <div className="error">
                                      {errors.vendors[index].venderName}
                                    </div>
                                  )}
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl sx={{ width: "100%" }}>
                                  <Field
                                    as={RadioGroup}
                                    name={`vendors[${index}].ismain`}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio />}
                                      label="Is Main"
                                    />
                                  </Field>
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl sx={{ width: "100%" }}>
                                  <InputLabel>Variant</InputLabel>
                                  <Field
                                    as={Select}
                                    name={`vendors[${index}].varient`}
                                  >
                                    <MenuItem value={"L"}>L</MenuItem>
                                    <MenuItem value={"XL"}>XL</MenuItem>
                                    <MenuItem value={"XXL"}>XXL</MenuItem>
                                  </Field>
                                  {touched.vendors &&
                                    touched.vendors[index] &&
                                    touched.vendors[index].varient &&
                                    errors.vendors &&
                                    errors.vendors[index] &&
                                    errors.vendors[index].varient && (
                                      <div className="error">
                                        {errors.vendors[index].varient}
                                      </div>
                                    )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <TextField
                                  fullWidth
                                  type="number"
                                  placeholder="Number"
                                  name={`vendors[${index}].number`}
                                />
                                {touched.vendors &&
                                  touched.vendors[index] &&
                                  touched.vendors[index].number &&
                                  errors.vendors &&
                                  errors.vendors[index] &&
                                  errors.vendors[index].number && (
                                    <div className="error">
                                      {errors.vendors[index].number}
                                    </div>
                                  )}
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                        <IconButton
                          type="button"
                          color="primary"
                          onClick={() =>
                            push({
                              venderName: "",
                              ismain: false,
                              varient: "",
                              number: "",
                            })
                          }
                        >
                          <Add />
                        </IconButton>
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
                      </div>
                    )}
                  </FieldArray>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UserModal;
