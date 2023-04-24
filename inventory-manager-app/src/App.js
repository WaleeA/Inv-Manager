import React, { useState, useEffect } from "react";
import "./App.css";
import pb from "./lib/pocketbase.js";
import {
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Switch,
  useMediaQuery,
  Grid,
  FormControl,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Set the default mode
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "8px",
      }}
    >
      <Typography>Dark mode</Typography>
      <Switch checked={darkMode} onChange={onToggle} />
    </div>
  );
}

const data = {
  email: "test",
  shoeName: "test",
  brand: "test",
  purchasePrice: 123,
  soldPrice: 123,
  purchaseDate: "2022-01-01 10:00:00.123Z",
  soldDate: "2022-01-01 10:00:00.123Z",
  isSold: true,
  soldLocation: "test",
  profitLoss: 123,
};

// Create function
async function createSneaker(data) {
  const record = await pb.collection("shoes_db").create(data);
  return record;
}

// Read function
async function getSneaker(recordId) {
  const record = await pb.collection("shoes_db").getOne(recordId, {
    expand: "relField1,relField2.subRelField",
  });
  return record;
}

// Update function
async function updateSneaker(recordId, data) {
  const record = await pb.collection("shoes_db").update(recordId, data);
  return record;
}

// Delete function
async function deleteSneaker(recordId) {
  await pb.collection("shoes_db").delete(recordId);
}
// Search filter and sort
async function fetchSneakers(setSneakers, searchQuery = "") {
  let filter = 'created >= "2022-01-01 00:00:00"';

  if (searchQuery) {
    filter += ` && (shoeName match "${searchQuery}" || brand match "${searchQuery}")`;
  }

  const records = await pb.collection("shoes_db").getFullList({
    filter,
    sort: "-created",
  });
  setSneakers(records);
}

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dummy, setDummy] = useState(0); // Dummy state to force re-render
  const [formMode, setFormMode] = useState("create");
  const [newSneaker, setNewSneaker] = useState({
    email: "",
    shoeName: "",
    brand: "",
    purchasePrice: "",
    soldPrice: "",
    purchaseDate: getCurrentDateTime(),
    soldDate: null,
    isSold: false,
    soldLocation: "",
    profitLoss: "",
  });
  const emptySneaker = {
    userName: "",
    shoeName: "",
    brand: "",
    purchasePrice: getCurrentDateTime(),
    soldPrice: "",
    purchaseDate: "",
    soldDate: "",
    isSold: false,
    soldLocation: "",
    profitLoss: "",
  };

  function getCurrentDateTime() {
    const date = new Date();
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const localDateTime = localDate.toISOString().substr(0, 16);
    return localDateTime;
  }

  // Fetch sneakers from Pocketbase
  useEffect(() => {
    fetchSneakers(setSneakers);
  }, []);

  function handleSearch() {
    fetchSneakers(setSneakers, searchQuery); // Pass setSneakers as an argument
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newSneaker.purchaseDate) {
      alert("Please provide a purchase date.");
      return;
    }
    await createSneaker(newSneaker);
    fetchSneakers(setSneakers); // Refresh the sneakers list after creating a new item
    // Reset the form

    setNewSneaker({ emptySneaker });
    setDummy(Math.random());
  }
  async function handleFormSubmit(e) {
    e.preventDefault();

    const sneakerData = {
      ...newSneaker,
      purchaseDate:
        newSneaker.purchaseDate === "" ? null : newSneaker.purchaseDate,
      soldDate: newSneaker.soldDate === "" ? null : newSneaker.soldDate,
    };

    console.log("sneakerData before submission:", sneakerData); // Add this line

    if (formMode === "create") {
      await createSneaker(sneakerData);
      setDummy(Math.random());
    } else {
      await updateSneaker(newSneaker.id, sneakerData);
      setDummy(Math.random());
    }

    fetchSneakers(setSneakers); // Refresh the sneakers list after updating or creating a record
    setFormMode("create"); // Reset the form mode to "create"
    setNewSneaker({ ...emptySneaker, purchaseDate: getCurrentDateTime() }); // Reset the form fields
    setDummy(Math.random());
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setNewSneaker((prevSneaker) => ({
        ...prevSneaker,
        [name]: checked,
      }));
    } else if (name === "purchaseDate" || name === "soldDate") {
      setNewSneaker((prevSneaker) => ({
        ...prevSneaker,
        [name]: value || null,
      }));
    } else {
      setNewSneaker((prevSneaker) => ({
        ...prevSneaker,
        [name]: value,
      }));
    }
  }

  async function handleUpdate(sneaker) {
    setFormMode("update");
    setNewSneaker(sneaker);
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    if (selectedSneaker) {
      await updateSneaker(selectedSneaker.id, selectedSneaker);
      fetchSneakers(setSneakers); // Refresh the sneakers list after updating an item
      setSelectedSneaker(null); // Reset the selected sneaker
    }
  }

  async function handleDelete(recordId) {
    await deleteSneaker(recordId);
    fetchSneakers(setSneakers); // Refresh the sneakers list after deleting an item
    setDummy(Math.random());
  }

  return (
    <Container>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              type="text"
              placeholder="Search by shoe name or brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
        <table>
          <thead>
            <tr>
              <th>Shoe Name</th>
              <th>Brand</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
              <th>Sold Price</th>
              <th>Sold Date</th>
              <th>Is Sold</th>
              <th>Sold Location</th>
              <th>Profit / Loss</th>
            </tr>
          </thead>
          <tbody>
            {sneakers.map((sneaker) => (
              <tr key={sneaker.id}>
                <td>{sneaker.shoeName}</td>
                <td>{sneaker.brand}</td>
                <td>{sneaker.purchasePrice}</td>
                <td>{sneaker.purchaseDate}</td>
                <td>{sneaker.soldPrice}</td>
                <td>{sneaker.soldDate}</td>
                <td>{sneaker.isSold ? "Yes" : "No"}</td>
                <td>{sneaker.soldLocation}</td>
                <td>
                  {sneaker.soldPrice
                    ? sneaker.soldPrice - sneaker.purchasePrice
                    : ""}
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(sneaker)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(sneaker.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
      <form onSubmit={handleFormSubmit}>
        <label>
          <TextField
            label="Email"
            type="text"
            name="email"
            value={newSneaker.email}
            onChange={handleChange}
            variant="outlined"
          />
        </label>
        <label>
          <TextField
            label="Shoe Name"
            type="text"
            name="shoeName"
            value={newSneaker.shoeName}
            onChange={handleChange}
            variant="outlined"
          />
        </label>
        <label>
          <TextField
            label="Brand"
            type="text"
            name="brand"
            value={newSneaker.brand}
            onChange={handleChange}
            variant="outlined"
          />
        </label>
        <label>
          <TextField
            label="Purchase Price"
            type="number"
            name="purchasePrice"
            value={newSneaker.purchasePrice}
            onChange={handleChange}
            variant="outlined"
          />
        </label>
        <label>
          <TextField
            label="Sold Price"
            type="number"
            name="soldPrice"
            value={newSneaker.soldPrice}
            onChange={handleChange}
            variant="outlined"
          />
        </label>
        <label>
          <TextField
            label="Purchase Date"
            type="datetime-local"
            name="purchaseDate"
            value={newSneaker.purchaseDate}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </label>
        <label>
          <TextField
            label="Sold Date (optional)"
            type="datetime-local"
            name="soldDate"
            value={newSneaker.soldDate || ""}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </label>
        <label>
          <TextField
            label="Sold Location"
            type="text"
            name="soldLocation"
            value={newSneaker.soldLocation}
            onChange={handleChange}
            variant="outlined"
          />
        </label>
        <label>
          <FormControlLabel
            control={
              <Checkbox
                name="isSold"
                checked={newSneaker.isSold}
                onChange={(e) =>
                  handleChange({ ...e, value: e.target.checked })
                }
              />
            }
            label="Is Sold"
          />
        </label>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              {formMode === "create" ? "Create Record" : "Update Record"}
            </Button>
          </Box>
        </Grid>
      </form>
    </Container>
  );
}

function Main() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const appliedTheme = darkMode ? darkTheme : theme;

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <DarkModeToggle darkMode={darkMode} onToggle={handleDarkModeToggle} />
      <App />
    </ThemeProvider>
  );
}

export default Main;
