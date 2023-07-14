import { useQuery } from 'react-query';
import { getItemList } from '../api/itemlist';
import '../App.css';

function ItemList() {
  const { isLoading, isError, data } = useQuery('itemlist', getItemList);

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
        {data.map((item) => {
          return (
            <div key={item.id}>
              <p>id: {item.id}</p>
              <h3>{item.title}</h3>
              <div>{item.content}</div>
              <button>
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
