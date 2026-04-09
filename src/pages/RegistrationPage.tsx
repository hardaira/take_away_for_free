import React, { useState } from 'react';
import './RegistrationPage.scss';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import TopBackLink from "../components/TopBackLink/TopBackLink";

export const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const [registrationError, setRegistrationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage('');
    setLoading(true);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Всі поля повинні бути заповнені");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Пароль не відповідає вимогам");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://team-project-backend-production.up.railway.app/auth/registration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {

        setSuccessMessage(data.message);
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        setLoading(false);
        console.log("Data received!");
        return;
      }

      if (res.status === 409 || res.status === 400) {
        // setRegistrationError('This email is already registered');
        
        setError(data.Error);
        return;
      }

      //setRegistrationError('Registration failed. Please try again later.');
    } catch (error) {
      setError( error || 'Реєстрація не пройшла. Сервер не відповідає.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <TopBackLink />
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <label htmlFor="password">Password(min 8 symbols)</label> */}
              <div className="input-group">
                <div className="input-wrapper">
                  {hidePassword ? (
                    <>
                      <input
                        // id="password"
                        type="password"
                        className="input-style"
                        placeholder="Введіть свій пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <IoEyeOutline
                        style={{ marginRight: "16px" }}
                        onClick={() => setHidePassword(false)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        // id="password"
                        type="text"
                        className="input-style"
                        placeholder="Введіть свій пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <IoEyeOffOutline
                        style={{ marginRight: "16px" }}
                        onClick={() => setHidePassword(true)}
                      />
                    </>
                  )}
                </div>
                <p className="rule">
                  Пароль має містити мінімум 8 знаків (хоча б одну велику літеру
                  (A-Z), хоча б одну малу літеру (a-z), хоча б одну цифру, хоча
                  б один спецсимвол ( @$!%*?&.#_-))
                </p>
              </div>

              <button type="submit" className="loginButton" disabled={loading}>
                {loading ? "Надсилається" : "Надіслати"}
              </button>
            </form>
          </div>
          
          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};
