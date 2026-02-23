// import { useOutletContext } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import './ResetUserPassword.scss';
// type User = {
//   id: number;
//   name: string;
// };

// type OutletContextType = {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// };

export const ResetUserPassword: React.FC = () => {
  // const { user, setUser } = useOutletContext<OutletContextType>();
// const { resetToken } = useParams<{ resetToken?: string }>();
// const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  // const [oldPassword, setOldPassword] = useState('');
  // const [passwordError, setPasswordError] = useState('');

//   const handleResetPassword = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setPasswordError('');

//   if (!newPassword.trim()) {
//     setPasswordError('New password field cannot be empty');
//     return;
//   }

//   try {
//     const res = await fetch(
//       `http://localhost:5000/users/reset-password/${resetToken}`,
//       {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword }),
//       },
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       setPasswordError(data.message || 'Failed to change password');
//       return;
//     }

//     setPasswordError('Password changed successfully.');
//     // setOldPassword('');
//     setNewPassword('');
//     navigate(`/reset-success`);

//   } catch {
//     setPasswordError('Failed to update your password');
//   }
// };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="centered">
            <div className="form__box__login">
              {/* <form onSubmit={handleResetPassword}> */}
              <form className="reset-form">
                {/* <input
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Enter your old password"
      /> */}
                <div className="input-wrapper">
                  <input
                    className="input-style"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Введіть новий пароль"
                  />
                </div>
                <button type="submit" className="loginButton confirm">
                  Підтвердити
                </button>
              </form>

              {/* {passwordError && (
          <p style={{ color: 'red' }}>{passwordError}</p>
      )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
