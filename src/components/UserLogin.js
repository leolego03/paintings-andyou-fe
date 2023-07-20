import axios from 'axios';
import { useState } from 'react';

function UserLogin() {
  const [username, setUsername] = useState('user2');
  const [password, setPassword] = useState('user2@123');

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
      console.log('Authentication completed...!');
      const accessToken = response.data;
      console.log('accessToken: ', accessToken);
      axios.defaults.headers.common['Authorization'] = accessToken;
    }
  }

  return (
    <>
      <button
        className='Login-button'
        onClick={onClickLoginButton}
      >
        Login
      </button>
    </>
  )
}

export default UserLogin