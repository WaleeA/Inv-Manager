import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { getItem, updateItem } from "./crudFunctions";

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

function EditItem() {
  const classes = useStyles();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem(itemId, (fetchedItem) => {
      setItem(fetchedItem);
    });
  }, [itemId]);

  const handleChange = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateItem(itemId, item);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Edit Item
        </Typography>
        <Paper className={classes.formContainer}>
          <form onSubmit={handleSubmit}>
            {/* Add form fields for editing an item here */}
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default EditItem;
