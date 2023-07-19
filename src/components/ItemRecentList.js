import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import '../App.css';

function ItemRecentList() {

  const res = useInfiniteQuery(
    'infiniteItem',
    ({ pageParam = 1 }) => axios.get(`${process.env.REACT_APP_SERVER_URL}/item/scroll`, {
      params: {
        // pageParam: pageParam
        page: pageParam,
        size: 5,
        isAsc: false
      }},
      { withCrentials: true }
    ), {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.result.number + 2;
    }}
  );

  if(res.isLoading) {
    return (
      <h3>Loading...!</h3>
    )
  }

  if(res.data) {
    return (
      <>
        {res.data.pages.map((page) => {
          return (
            // console.log(page);
            page.data.result.content.map((item) => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>id: {item.id}</p>
                <div>{item.content}</div>
              </div>
            ))
          )}
        )}

        <button onClick={() => res.fetchNextPage()}>
          Load More
        </button>
      </>
    )
  }
}

export default ItemRecentList