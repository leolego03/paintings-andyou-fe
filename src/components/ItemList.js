import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getItemList, deleteItem } from '../api/item';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function ItemList() {
  const navigate = useNavigate();
  
  const { isLoading, isError, data } = useQuery('item', getItemList);

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('item')
      console.log('Deleted item successfully!')
    }
  })

  const onClickDeleteButton = (id) => {
    mutation.mutate(id);
  }

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error has occured...!</h3>;
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate('/add')
          }}
        >
          Add Item
        </button>
        {/* List area */}
        {data.result.map((item) => {
        // {data.map((item) => {
          return (
            <div key={item.id}>
              <p>id: {item.id}</p>
              <h3>{item.title}</h3>
              <div>{item.content}</div>
              <button
                onClick={()=>onClickDeleteButton(item.id)}
              >
                X
              </button>
              <Link
                to={`/edit/${item.id}`}
                state={{
                  title: item.title,
                  content: item.content
                }}
              >
                Edit
              </Link>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default ItemList
