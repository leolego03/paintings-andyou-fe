import { useInfiniteQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function ItemRecentList() {
  const navigate = useNavigate();

  const res = useInfiniteQuery(
    'itemRecent',
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
      <div className='ItemRecentList-container'>
        <div className='ItemRecentList-button-wrapper'>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </button>
        </div>

        <div className='ItemRecentList'>
          {res.data.pages.map((page) => {
            return (
              // console.log(page);
              page.data.result.content.map((item) => (
                <div key={item.id} className='ItemRecent'>
                  <div className='ItemRecent-image-wrapper'>
                    <img src={item.imagePath} alt='' />
                  </div>

                  <div className='ItemRecent-inner'>
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
                          content: item.content,
                          imagePath: item.imagePath
                        }}
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          )}
        </div>

        <div>
          <button onClick={() => res.fetchNextPage()}>
            Load More
          </button>
        </div>
      </div>
    )
  }
}

export default ItemRecentList