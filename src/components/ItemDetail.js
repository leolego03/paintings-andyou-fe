import { useMutation, useQueryClient } from 'react-query';
import { deleteItem } from '../api/item';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../App.css';

function Item() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('item')
      console.log('Deleted item successfully!')
    }
  })

  const detailTitle = location.state?.title;
  const detailContent = location.state?.content;
  const detailImage = location.state?.imagePath;

  const onClickDeleteButton = () => {
    mutation.mutate(params.id);
  }

  return (
    <>
      <div className='ItemDetail-wrapper'>
        {/* Detail Area */}
        <div className='ItemDetail'>
          <h3>Painting Details...!</h3>
          <p>{detailTitle}</p>
          {/* <p>id: {params.id}</p> */}

          <div className='ItemDetail-image-wrapper'>
            <img src={detailImage} alt='' />
          </div>

          <div className='ItemDetail-content-wrapper'>
            <div>{detailContent}</div>
          </div>

          <div className='ItemDetail-button-wrapper'>
            <button
              onClick={onClickDeleteButton}
            >
              Delete
            </button>

            <button
              onClick={() => {
                navigate('/')
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item