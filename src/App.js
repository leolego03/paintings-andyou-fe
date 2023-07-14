import { useMutation, useQuery, useQueryClient } from 'react-query';
import './App.css';
import { addItem, getItemList } from './api/itemlist';
import { useState } from 'react';

function App() {
  const { isLoading, isError, data } = useQuery('itemlist', getItemList);
  
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

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error has occured...!</h3>;
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
          />
        </div>
        <div>
          <input
            type="text"
          />
        </div>
        <div>
          <textarea
            rows="5"
            cols="50"
          ></textarea>
        </div>
        <div>
          <button >Edit</button>
        </div>
      </div>

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

      <div>
        {/* List area */}
        {data.map((item) => {
          return (
            <div key={item.id}>
              <p>id: {item.id}</p>
              <h3>{item.title}</h3>
              <div>{item.content}</div>
              <button>
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
