import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { editItem } from '../api/item';
import '../App.css';

function ItemEdit() {
  const queryClient = useQueryClient();
  const mutation = useMutation(editItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('item')
      console.log('Edited item successfully!')
    }
  })

  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const onChangeEditId = (e) => {
    setEditId(e.target.value)
  }

  const onChangeEditTitle = (e) => {
    setEditTitle(e.target.value);
  }

  const onChangeEditContent = (e) => {
    setEditContent(e.target.value);
  }

  const onClickEditButton = () => {
    mutation.mutate({
      id: editId,
      title: editTitle,
      content: editContent
    });

    setEditId('');
    setEditTitle('');
    setEditContent('');
  }

  return (
    <>
      <div>
        {/* Edit area */}
        <h3>Edit</h3>
        <div>
          <label>id: </label>
          <input
            type="text"
            value={editId}
            onChange={onChangeEditId}
          />
        </div>
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
          <button onClick={onClickEditButton}>Edit</button>
        </div>
      </div>
    </>
  )
}

export default ItemEdit