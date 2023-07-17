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
const addItem = async (newItem) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/item`, newItem
  );
}

// Edit
const editItem = async ({id, title, content}) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/item/${id}`,
    {
      title,
      content
    }
  );
}

// Delete
const deleteItem = async (id) => {
  await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/item/${id}`
  );
}

export { getItemList, addItem, editItem, deleteItem };