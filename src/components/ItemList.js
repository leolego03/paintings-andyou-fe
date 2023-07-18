import { useQuery } from 'react-query';
import { getItemList } from '../api/item';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function ItemList() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('item', getItemList);

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error has occured...!</h3>;
  }

  return (
    <>
      <div className='ItemList-container'>
        <div>
          <button
            onClick={() => {
              navigate('/add')
            }}
          >
            Add Item
          </button>
        </div>

        <div>
          {/* List area */}
          {/* {data.map((item) => { */}
          {data.result.map((item) => {
            return (
              <div key={item.id} className='Item'>
                <h3>{item.title}</h3>
                <p>id: {item.id}</p>
                <div>{item.content}</div>
                <div>
                  <Link
                    to={`/edit/${item.id}`}
                    state={{
                      title: item.title,
                      content: item.content
                    }}
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/detail/${item.id}`}
                    state={{
                      title: item.title,
                      content: item.content
                    }}
                  >
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default ItemList
