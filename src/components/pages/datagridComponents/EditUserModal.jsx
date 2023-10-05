import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const EditUserModal = ({ isOpen, onClose, user }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You have Clicked");
  };

  console.log(user);
  return (
    <Modal
      open={isOpen}
      //  onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          bgcolor: "background.paper",
          border: "2px solid",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          Edit User
        </Typography>
        {user && (
          <>
            <div
              style={{
                maxHeight: "590px",
                overflowY: "auto",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      margin="normal"
                      value={user.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Description"
                      fullWidth
                      margin="normal"
                      value={user.description}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Vendor Name"
                      fullWidth
                      margin="normal"
                      value={user.vendors[0].nameV}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: "100%" }}>
                      <FormControlLabel
                        control={
                          <Radio checked={user.vendors[0].is_main} readOnly />
                        }
                        label="Is Main"
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Typography variant="h6" mt={3} mb={1}>
                  Variants
                </Typography>
                {user.vendors[0].varients.map((variant, index) => (
                  <Grid container spacing={2} key={index} alignItems={"center"}>
                    <Grid item xs={5}>
                      <TextField
                        label={`Variant ${index + 1}`}
                        fullWidth
                        margin="normal"
                        value={variant[Object.keys(variant)[0]]}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    {index >= 0 && (
                      <Grid
                        justifyContent={"flex-end"}
                        xs={4}
                        alignItems={"center"}
                        item
                      >
                        <IconButton
                          type="button"
                          color="error"
                          onClick={() => alert("Only for UI Purpose")}
                        >
                          <Delete fontSize="medium" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                ))}

                <Grid container justifyContent={"center"} mt={1}>
                  <Button
                    onClick={onClose}
                    variant="contained"
                    color="error"
                    sx={{ marginRight: "8px" }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Grid>
              </form>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditUserModal;
