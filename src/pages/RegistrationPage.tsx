import React, { useState } from 'react';
import './RegistrationPage.scss';

export const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registrationError, setRegistrationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    setRegistrationError('');
    setSuccessMessage('');

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/users/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {

        setSuccessMessage(data.message);
        setName('');
        setEmail('');
        setPassword('');
        return;
      }

      if (res.status === 409 || res.status === 400) {
        // setRegistrationError('This email is already registered');
        setRegistrationError(data.message);
        return;
      }

      setRegistrationError('Registration failed. Please try again later.');
    } catch (error) {
      setRegistrationError('Реєстрація не пройшла. Сервер не відповідає.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="centered">
          <div className="form__box__login">
            <h2>Реєстрація</h2>

            {/* <form onSubmit={handleAddUser}> */}
            <form className="registration__box" onSubmit={handleAddUser}>
              {/* <label htmlFor="name">Введіть ім'я користувача</label>  */}
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  className="input-style"
                  placeholder="Введіть своє ім'я"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              {/* <label htmlFor="email">E-mail</label> */}
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  className="input-style"
                  placeholder="Введіть свій email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              {/* <label htmlFor="password">Password(min 8 symbols)</label> */}
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  className="input-style"
                  placeholder="Введіть свій пароль"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="loginButton" disabled={loading}>
                {loading ? 'Надсилається' : 'Надіслати'}
              </button>
              {registrationError && (
                <p style={{ color: 'red' }}>{registrationError}</p>
              )}
            </form>
          </div>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};
