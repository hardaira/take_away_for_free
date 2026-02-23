// import { useOutletContext } from 'react-router-dom';
// import React, { useState } from 'react';
import React, { useState } from 'react';
import './ChangePassword.scss';
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
  const [oldPassword, setOldPassword] = useState('');
  const [passwordError, _setPasswordError] = useState('');
  // const handleChangePassword = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setPasswordError('');

  //   if (!oldPassword.trim()) {
  //     setPasswordError('Old password field cannot be empty');
  //     return;
  //   }

  //   if (!newPassword.trim()) {
  //     setPasswordError('New password field cannot be empty');
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/users/${user.id}/change-password`,
  //       {
  //         method: 'PATCH',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ oldPassword, newPassword }),
  //       },
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setPasswordError(data.message || 'Failed to change password');
  //       return;
  //     }

  //     setPasswordError('Password changed successfully');
  //     setOldPassword('');
  //     setNewPassword('');
  //   } catch {
  //     setPasswordError('Failed to update your password');
  //   }
  // };

  return (
    <>
      {/* <form onSubmit={handleChangePassword}> */}
      <form className="change-password">
        <div className="input-wrapper">
          <input
            type="password"
            className="input-style"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Введіть старий пароль"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            className="input-style"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Введіть новий пароль"
          />
        </div>
        <button type="submit" className="profileButton confirm">
          Підтвердити
        </button>
      </form>

      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
    </>
  );
};
