import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { editItem } from '../api/item';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../App.css';

function ItemEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const queryClient = useQueryClient();
  const mutation = useMutation(editItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('item')
      console.log('Edited item successfully!')
    }
  })

  const currentTitle = location.state?.title;
  const currentContent = location.state?.content;

  const [editTitle, setEditTitle] = useState(currentTitle);
  const [editContent, setEditContent] = useState(currentContent);

  const onChangeEditTitle = (e) => {
    setEditTitle(e.target.value);
  }

  const onChangeEditContent = (e) => {
    setEditContent(e.target.value);
  }

  const onClickEditSumbitButton = () => {
    const editItem = {
      id: params.id,
      title: editTitle,
      content: editContent
    }

    mutation.mutate(editItem);

    setEditTitle('');
    setEditContent('');
  }

  return (
    <>
      <div>
        {/* Edit area */}
        <h3>Edit</h3>
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={onChangeEditTitle}
          />
        </div>
        <div>
          <textarea
            rows="5"
            cols="50"
            value={editContent}
            onChange={onChangeEditContent}
          ></textarea>
        </div>
        <div>
          <button onClick={onClickEditSumbitButton}>Submit</button>
          <button onClick={() => {
            navigate('/');
          }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  )
}

export default ItemEdit