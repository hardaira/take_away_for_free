import './LoginPage.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectAllProducts, addProduct } from '../features/products';

export const LoginPage: React.FC = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState('');

  return (
    <div className="section">
      <div className="container">
        <div className="centered">
          <div className="form__box__login">
            {/* <form onSubmit={handleLogin}> */}
            <form className="registration__box">
              {/* <label htmlFor="email">Email</label> */}
              <div className="input-wrapper">
                <input
                  // id="email"
                  type="email"
                  className="input-style"
                  placeholder="Введіть свій email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* <label htmlFor="password">Пароль</label> */}
              <div className="input-wrapper">
                <input
                  // id="password"
                  type="password"
                  className="input-style"
                  placeholder="Введіть свій пароль"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="loginButton">
                Підтвердити
              </button>
            </form>

            {/* {loginError && <p style={{ color: 'red' }}>{loginError}</p>} */}

            <p>Немає облікового запису?</p>
            <p className="login_link" onClick={() => navigate('/registration')}>
              Зареєструватись
            </p>

            <p
              className="login_link"
              onClick={() => navigate('/reset-password')}
            >
              Забули пароль?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
