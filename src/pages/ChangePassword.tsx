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
  const [passwordError, setPasswordError] = useState('');
const [hidePassword, setHidePassword] = useState(true);
const token = localStorage.getItem("token");
 //userString = localStorage.getItem("user");
//constconst user = userString ? JSON.parse(userString) : null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword.trim()) {
      setPasswordError('Old password field cannot be empty');
      return;
    }

    if (!newPassword.trim()) {
      setPasswordError('New password field cannot be empty');
      return;
    }

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

      if (!res.ok) {
        setPasswordError(data.message || 'Failed to change password');
        return;
      }

      setPasswordError('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setPasswordError('Failed to update your password');
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
                placeholder="Введіть старий пароль"
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
                placeholder="Введіть старий пароль"
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
                  placeholder="Введіть новий пароль"
                  value={newPassword}
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
          <p className="rule profile__input">
            Пароль має містити мінімум 8 знаків (хоча б одну велику літеру
            (A-Z), хоча б одну малу літеру (a-z), хоча б одну цифру, хоча б один
            спецсимвол ( @$!%*?&.#_-))
          </p>
        </div>
        <button type="submit" className="profileButton">
          Підтвердити
        </button>
      </form>

      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
    </>
  );
};
