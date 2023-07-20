import { useMutation, useQueryClient } from 'react-query';
import { useState, useRef } from 'react';
import { addItem } from '../api/item';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ItemAdd() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('item')
      console.log('Added item successfully!')
    }
  })

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onChangeImage = (e) => {
    console.log(e.target.files[0]);
    console.log(typeof e.target.files[0]);

    setImage(e.target.files[0]);
  }

  const onClickSubmitButton = (e) => {
    e.preventDefault();

    const newItem = {
      title,
      content
    };

    const formData = new FormData();
    const jsonNewItem = JSON.stringify(newItem);
    const blob = new Blob([jsonNewItem], { type: "application/json" });

    formData.append("data", blob);
    formData.append("image", image);

    mutation.mutate(newItem);

    setTitle('');
    setContent('');
    inputRef.current.value = null;
  }

  return (
    <div className='ItemAdd-container'>
      <div className='ItemAdd'>
        {/* Form area */}
        <h3>Add Painting...!</h3>

        <form onSubmit={onClickSubmitButton}>
          <div className='ItemAdd-input-container'>
            <label>Title</label>
            <input
              type='text'
              value={title}
              onChange={onChangeTitle}
            />
          </div>

          <div className='ItemAdd-textarea-container'>
            <label>Content</label>
            <textarea
              value={content}
              onChange={onChangeContent}
            >
            </textarea>
          </div>

          <div className='ItemAdd-input-container'>
            <label>Image</label>
            <input
              ref={inputRef}
              type='file'
              accept='image/*'
              onChange={onChangeImage}
            />
          </div>

          <div className='ItemAdd-button-container'>
            <button type="submit">Add</button>
            <button onClick={() => {
              navigate('/')
            }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemAdd