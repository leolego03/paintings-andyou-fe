import { useNavigate } from 'react-router-dom';
import ItemList from '../components/ItemList';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='Home'>
      <div className='Home-button-wrapper'>
        <button
          onClick={() => {
            navigate('/login')
          }}
        >
          Login Page
        </button>
      </div>

      <div className='Home-button-wrapper'>
        <button
          onClick={() => {
            navigate('/recent')
          }}
        >
          Recent Paintings
        </button>

        <button
          onClick={() => {
            navigate('/add')
          }}
        >
          Add Painting
        </button>
      </div>

      <ItemList />
    </div>
  )
}

export default Home