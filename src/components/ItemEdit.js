import { useMutation, useQueryClient } from 'react-query';
import { useState, useRef } from 'react';
import { editItem } from '../api/item';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../App.css';

function ItemEdit() {
  const inputRef = useRef(null);
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
  const [editImage, setEditImage] = useState(null);

  const onChangeEditTitle = (e) => {
    setEditTitle(e.target.value);
  }

  const onChangeEditContent = (e) => {
    setEditContent(e.target.value);
  }

  const onChangeEditImage = (e) => {
    console.log(e.target.files[0]);
    console.log(typeof e.target.files[0]);

    setEditImage(e.target.files[0]);
  }

  const onClickEditSumbitButton = () => {
    const editFormData = new FormData();
    const jsonEditItemData = JSON.stringify({
      title: editTitle,
      content: editContent
    });
    const editBlob = new Blob([jsonEditItemData], { type: "application/json" })

    editFormData.append("data", editBlob);
    editFormData.append("image", editImage);

    const editItem = {
      id: params.id,
      editFormData
    }

    mutation.mutate(editItem);

    setEditTitle('');
    setEditContent('');
    inputRef.current.value = null;
  }

  return (
    <div className='ItemEdit-container'>
      <div className='ItemEdit'>
        {/* Edit area */}
        <h3>Edit Painting...!</h3>
        {/* <p>id: {params.id}</p> */}
        
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

        <div className='ItemAdd-input-container'>
          <label>Image</label>
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            onChange={onChangeEditImage}
          />
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
  )
}

export default ItemEdit