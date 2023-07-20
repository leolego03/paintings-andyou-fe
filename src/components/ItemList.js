import { useEffect, useRef, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function ItemList() {
  const observerElem = useRef(null);

  const {data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    'item',
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
        const nextPage = allPages.length + 1
        return lastPage.data.result.number + 1 !== 0 ? nextPage : undefined
    }}
  );

  const handleObserver = useCallback((entries) => {
    const [target] = entries
    if(target.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])
  
  useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0 }
  
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver])

  return (
    <div className='ItemList'>
      {isSuccess && data.pages.map((page) => {
        // console.log(page);
        return (
          page.data.result.content.map((item) => (
            <div key={item.id} className='Item'>
              <div className='Item-image-wrapper'>
                <img src={item.imagePath} alt='' />
              </div>

              <div className='Item-inner'>
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

      <div className='loader' ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? 'Loading...' : 'No search left'}
      </div>
    </div>
  )
}

export default ItemList
