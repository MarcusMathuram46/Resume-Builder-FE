import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import '../App.css';
import { instance } from '../services/instance';

function Activated() {

  // const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleActivation = async (e) => {
    
    try {
      e.preventDefault();

      const activationToken = await window.location.pathname.slice(-7);

      const activated = await instance.get(`/activate/${activationToken}`);

      if (activated.data.message === 'Account Activated Succeessfully') {
        setMessage('Account Activated Successfully. You can now go and login.');
        // console.log('Account Activated Successfull');
        // navigate('/login');
      } else {
        // console.log('Error in Account Activation')
        setMessage('Error in Account Activation');
      }

    } catch (error) {
      console.error('Error while during Activation', error);
    }
  }
  return (
    <div>
    
      <form onSubmit={handleActivation}>
        <h1>Please Click the Activate Account Button Below to Activate Your Inactive Account</h1>
        <button type='submit'>Activate Account</button>
        {message && <h2 id='activ-msg'>{message}</h2>}
        <h2>If you Don't want to Activate Account Please Reject this step</h2>
      </form>

    </div>
  )
}

export default Activated;