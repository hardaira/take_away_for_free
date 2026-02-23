 import React, { useState } from 'react';
import './ResetPassword.scss';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useOutletContext } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [loginError, setLoginError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  // const [resetMessage, setResetMessage] = useState('');
  return (
    <div className="section">
      <div className="container">
        <div className="centered">
          <div className="form__box__login">
            {/* <form onSubmit={handleResetPassword}> */}
            <form className="reset-form">
               {/* <label htmlFor="reset">
              Забули пароль? Введіть email для зміни паролю.
            </label>  */}
              <div className="input-wrapper">
                <input
                  id="reset"
                  name="reset"
                  className="input-style"
                  type="resetEmail"
                  placeholder="Введіть свій email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  // style={{ width: '300px' }}
                />
              </div>
              <button
                type="submit"
                className="loginButton"
                // style={{ width: '120px' }}
                disabled={loading}
              >
                {loading ? 'Надсилається' : 'Надіслати'}
              </button>
              {/* {resetMessage && <p>{resetMessage}</p>} */}
            </form>
          </div>
        </div>
      </div>
     </div>
  );
  }
