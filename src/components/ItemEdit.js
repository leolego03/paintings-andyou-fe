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
    <div className='ItemEdit-container'>
      <div className='ItemEdit'>
        {/* Edit area */}
        <h3>Edit</h3>
        <p>id: {params.id}</p>
        <div className='ItemEdit-input-container'>
          <label>Title</label>
          <input
            type="text"
            value={editTitle}
            onChange={onChangeEditTitle}
          />
        </div>
        <div className='ItemEdit-textarea-container'>
          <label>Content</label>
          <textarea
            value={editContent}
            onChange={onChangeEditContent}
          ></textarea>
        </div>
        <div className='ItemEdit-button-container'>
          <button onClick={onClickEditSumbitButton}>Submit</button>
          <button onClick={() => {
            navigate('/');
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

export default ItemEdit