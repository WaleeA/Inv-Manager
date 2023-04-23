import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { addItem } from "./crudFunctions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
}));

function AddItem() {
  const classes = useStyles();
  const [item, setItem] = useState({
    name: "",
    brand: "",
    shoeSize: "",
    datePurchased: "",
    purchasePrice: "",
    soldPrice: "",
    soldDate: "",
    saleLocation: "",
  });

  const handleChange = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(item);
    setItem({
      name: "",
      brand: "",
      shoeSize: "",
      datePurchased: "",
      purchasePrice: "",
      soldPrice: "",
      soldDate: "",
      saleLocation: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Item
        </Typography>
        <Paper className={classes.formContainer}>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={item.name}
              onChange={handleChange}
              className={classes.formControl}
            />
            <TextField
              required
              fullWidth
              label="Brand"
              name="brand"
              value={item.brand}
              onChange={handleChange}
              className={classes.formControl}
            />
            <TextField
              required
              fullWidth
              label="Shoe Size"
              name="shoeSize"
              value={item.shoeSize}
              onChange={handleChange}
              className={classes.formControl}
            />
            <TextField
              required
              fullWidth
              label="Date Purchased"
              name="datePurchased"
              type="date"
              value={item.datePurchased}
              onChange={handleChange}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              fullWidth
              label="Purchase Price"
              name="purchasePrice"
              value={item.purchasePrice}
              onChange={handleChange}
              className={classes.formControl}
            />
            <TextField
              fullWidth
              label="Sold Price"
              name="soldPrice"
              value={item.soldPrice}
              onChange={handleChange}
              className={classes.formControl}
            />
            <TextField
              fullWidth
              label="Sold Date"
              name="soldDate"
              type="date"
              value={item.soldDate}
              onChange={handleChange}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Sale Location"
              name="saleLocation"
              value={item.saleLocation}
              onChange={handleChange}
              className={classes.formControl}
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Add Item
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AddItem;
