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

  const onClickDeleteButton = () => {
    mutation.mutate(params.id);
  }

  return (
    <>
      {/* Detail Area */}
      <div>
        <h3>Detail</h3>
        <p>{params.id}</p>
        <p>{detailTitle}</p>
        <div>{detailContent}</div>
      </div>

      <div>
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
    </>
  )
}

export default Item