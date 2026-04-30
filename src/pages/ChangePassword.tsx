// import { useOutletContext } from 'react-router-dom';
// import React, { useState } from 'react';
import React, { useState } from 'react';
import './ChangePassword.scss';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
// type User = {
//   id: number;
//   name: string;
// };

// type OutletContextType = {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// };

export const ChangePassword: React.FC = () => {
  // const { user, setUser } = useOutletContext<OutletContextType>();

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
const [hidePassword, setHidePassword] = useState(true);
const token = localStorage.getItem("token");
 //userString = localStorage.getItem("user");
//constconst user = userString ? JSON.parse(userString) : null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

 const passwordRegex =
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

 if (!currentPassword.trim() || !newPassword.trim()) {
   setError("Всі поля повинні бути заповнені");
   setLoading(false);
   return;
 }

 if (!passwordRegex.test(newPassword)) {
   setError("Новий пароль не відповідає вимогам");
   setLoading(false);
   return;
 }
    // if (!currentPassword.trim()) {
    //   setPasswordError('Old password field cannot be empty');
    //   return;
    // }

    // if (!newPassword.trim()) {
    //   setPasswordError('New password field cannot be empty');
    //   return;
    // }

    try {
      const res = await fetch(
        `https://team-project-backend-production.up.railway.app/users/me/password`,
        {
          method: "PATCH",
          headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await res.json();

      if (res.status === 500 || res.status === 400) {
        setSuccessMessage("");
        setError(data.Error);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.message);
        //setError('Ви ввели неправильний пароль');
        return;
      }

      setSuccessMessage(data.message);
      setCurrentPassword('');
      setNewPassword('');
      setLoading(false);
    } catch {
      console.error();
      setLoading(false);
      setSuccessMessage('');
      setError("Сервер не відповідає");
    }
  };

  return (
    <>
      <form className="change-password" onSubmit={handleChangePassword}>
        {/* <form className="change-password"> */}
        <div className="input-wrapper profile__input">
          {hidePassword ? (
            <>
              <input
                // id="password"
                type="password"
                className="input-style "
                placeholder="Введіть свій пароль"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <IoEyeOffOutline
                style={{ marginRight: "16px" }}
                onClick={() => setHidePassword(true)}
              />
            </>
          )}
        </div>

        <div className="input-group">
          <div className="input-wrapper profile__input">
            {hidePassword ? (
              <>
                <input
                  // id="password"
                  type="password"
                  className="input-style"
                  placeholder="Введіть новий пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <IoEyeOutline
                  style={{ marginRight: "16px", cursor: "pointer" }}
                  onClick={() => setHidePassword(false)}
                />
              </>
            ) : (
              <>
                <input
                  // id="password"
                  type="text"
                  className="input-style"
                  placeholder="Введіть новий пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <IoEyeOffOutline
                  style={{ marginRight: "16px", cursor: "pointer" }}
                  onClick={() => setHidePassword(true)}
                />
              </>
            )}
          </div>
          <p className="rule profile__input">
            Пароль має містити мінімум 8 знаків (хоча б одну велику літеру
            (A-Z), хоча б одну малу літеру (a-z), хоча б одну цифру, хоча б один
            спецсимвол ( @$!%*?&.#_-))
          </p>
        </div>
        <button type="submit" className="profileButton" disabled={loading}>
          {loading ? "Надсилається" : "Надіслати"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginBottom: "20px"}}>{error}</p>}
      {successMessage && <p style={{ color: "green", marginBottom: "20px"}}>{successMessage}</p>}
    </>
  );
};
