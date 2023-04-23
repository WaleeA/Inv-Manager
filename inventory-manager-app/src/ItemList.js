import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, off } from "firebase/database";
import db from "./firebase";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { Button } from "@mui/material";
import { deleteItem } from "./crudFunctions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ItemList() {
  const [items, setItems] = useState({});
  const classes = useStyles();
  const history = useNavigate();

  useEffect(() => {
    const itemsRef = ref(db, "items");
    onValue(itemsRef, (snapshot) => {
      setItems(snapshot.val());
    });

    return () => {
      off(itemsRef);
    };
  }, []);

  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };

  const handleEdit = (itemId) => {
    history.push(`/edit/${itemId}`);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory Manager
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="inventory table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Shoe Size</TableCell>
                <TableCell>Date Purchased</TableCell>
                <TableCell>Purchase Price</TableCell>
                <TableCell>Sold Price</TableCell>
                <TableCell>Sold Date</TableCell>
                <TableCell>Sale Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(items).map(([itemId, item]) => (
                <TableRow key={itemId}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.shoeSize}</TableCell>
                  <TableCell>{item.datePurchased}</TableCell>
                  <TableCell>{item.purchasePrice}</TableCell>
                  <TableCell>{item.soldPrice}</TableCell>
                  <TableCell>{item.soldDate}</TableCell>
                  <TableCell>{item.saleLocation}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(itemId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(itemId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default ItemList;
