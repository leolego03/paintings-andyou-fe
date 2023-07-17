import axios from 'axios';

// Read
const getItemList = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_BASE_URL}/post`,
    { withCrentials: true }
  );
  return response.data;
}

// Add
const addItem = async (newItem) => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_BASE_URL}/itemlist`, newItem
  );
}

export { getItemList, addItem };