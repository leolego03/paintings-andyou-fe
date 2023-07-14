import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { addItem } from '../api/itemlist';
import '../App.css';

function ItemAdd() {
  const queryClient = useQueryClient();
  const mutation = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('itemlist')
      console.log('Added item successfully!')
    }
  })

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onClickSubmitButton = (e) => {
    e.preventDefault();

    const newItem = {
      title,
      content
    };

    mutation.mutate(newItem);

    setTitle('');
    setContent('');
  }

  return (
    <>
      <div>
        {/* Form area */}
        <h3>Write</h3>
        <form onSubmit={onClickSubmitButton}>
          <div>
            <input
              type="text"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div>
            <textarea
              rows="5"
              cols="50"
              value={content}
              onChange={onChangeContent}
            >
            </textarea>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ItemAdd