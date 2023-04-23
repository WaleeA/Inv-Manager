import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
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
    filter += ` && (shoeName contains "${searchQuery}" || brand contains "${searchQuery}")`;
  }

  const resultList = await pb.collection("shoes_db").getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
  });

  const records = await pb.collection("shoes_db").getFullList({
    filter,
    sort: "-created",
  });

  const record = await pb
    .collection("shoes_db")
    .getFirstListItem('someField="test"', {
      expand: "relField1,relField2.subRelField",
    });
  setSneakers(records);
}

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  async function fetchSneakers() {
    const records = await pb.collection("shoes_db").getFullList({
      sort: "-created",
    });
    setSneakers(records);
  }

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
    fetchSneakers(); // Refresh the sneakers list after creating a new item
    // Reset the form
    setNewSneaker({ emptySneaker });
  }
  async function handleFormSubmit(e) {
    e.preventDefault();

    const sneakerData = {
      ...newSneaker,
      purchaseDate: newSneaker.purchaseDate || null,
      soldDate: newSneaker.soldDate === "" ? null : newSneaker.soldDate,
    };

    if (formMode === "create") {
      await createSneaker(sneakerData);
    } else {
      await updateSneaker(newSneaker.id, sneakerData);
    }

    fetchSneakers(); // Refresh the sneakers list after updating or creating a record
    setFormMode("create"); // Reset the form mode to "create"
    setNewSneaker({ ...emptySneaker, purchaseDate: getCurrentDateTime() }); // Reset the form fields
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
      fetchSneakers(); // Refresh the sneakers list after updating an item
      setSelectedSneaker(null); // Reset the selected sneaker
    }
  }

  async function handleDelete(recordId) {
    await deleteSneaker(recordId);
    fetchSneakers(); // Refresh the sneakers list after deleting an item
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by shoe name or brand"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
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
            <th>Profit / Loss</th>
            <th>Sold Location</th>
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
                <button onClick={() => handleUpdate(sneaker)}>Update</button>
                <button onClick={() => handleDelete(sneaker.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={newSneaker.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Shoe Name:
          <input
            type="text"
            name="shoeName"
            value={newSneaker.shoeName}
            onChange={handleChange}
          />
        </label>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={newSneaker.brand}
            onChange={handleChange}
          />
        </label>
        <label>
          Purchase Price:
          <input
            type="number"
            name="purchasePrice"
            value={newSneaker.purchasePrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Sold Price:
          <input
            type="number"
            name="soldPrice"
            value={newSneaker.soldPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Purchase Date:
          <input
            type="datetime-local"
            name="purchaseDate"
            value={newSneaker.purchaseDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Sold Date (optional):
          <input
            type="datetime-local"
            name="soldDate"
            value={newSneaker.soldDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Is Sold:
          <input
            type="checkbox"
            name="isSold"
            checked={newSneaker.isSold}
            onChange={(e) => handleChange({ ...e, value: e.target.checked })}
          />
        </label>
        <label>
          Sold Location:
          <input
            type="text"
            name="soldLocation"
            value={newSneaker.soldLocation}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          {formMode === "create" ? "Create Record" : "Update Record"}
        </button>
      </form>
    </div>
  );
}

export default App;
