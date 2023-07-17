import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getItemList, deleteItem } from '../api/item';
import '../App.css';

function ItemList() {
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
        {/* List area */}
        {data.result.map((item) => {
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
            </div>
          );
        })}
      </div>
    </>
  )
}

export default ItemList
