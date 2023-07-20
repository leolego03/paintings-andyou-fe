import axios from 'axios';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('user2');
  const [password, setPassword] = useState('user2@123');

  const cookies = new Cookies();

  const onClickLoginButton = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/user/login`,
      {
        username,
        password
      },
      { withCredentials: true }
    );
    setUsername('');
    setPassword('');
    console.log('response:', response);

    if (response.status === 200) {
      console.log('Authentication completed...!')
    }
  }

  const onClickRequestAuthButton = async () => {
    const accessToken = cookies.get('accesssToken');
    console.log('accessToken:', accessToken);
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/item/scroll?page=1&size=1`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }}
      );
      console.log('response', response.data.result);
  }

  return (
    <>
      <div className='UserLogin-container'>
        <div>
          <div className='UserLogin-button-wrapper'>
            <button
              onClick={onClickLoginButton}
            >
              Login
            </button>

            <button
              onClick={onClickRequestAuthButton}
            >
              Request Authorization
            </button>

            <button
              onClick={() => {
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

export default UserLogin