import axios from 'axios';

// Read
const getItemList = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/item`,
    { withCrentials: true }
  );
  return response.data;
}

// Add
const addItem = async (formData) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/item`,
    formData,
    { 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCrentials: true
    }
  );
}

// Edit
const editItem = async (editItem) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/item/${editItem.id}`,
    editItem.editFormData,
    { 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCrentials: true
    }
  );
}

// Delete
const deleteItem = async (id) => {
  await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/item/${id}`,
    { withCrentials: true }
  );
}

export { getItemList, addItem, editItem, deleteItem };