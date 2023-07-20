import { useNavigate } from 'react-router-dom';
import ItemList from '../components/ItemList';
import '../App.css';
import UserLogin from '../components/UserLogin';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='Home'>
      <div className='Header'>
        <h3>Painting and You</h3>

        <div>
          <UserLogin />
        </div>
      </div>

      <div className='Home-button-wrapper'>
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