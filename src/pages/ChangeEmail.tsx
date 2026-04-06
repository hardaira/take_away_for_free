// import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
// import type { OutletContextType } from '../types/user';
// type User = {
//   id: number;
//   name: string;
// };

// type OutletContextType = {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// };

export const ChangeEmail: React.FC = () => {
  // const { user, setUser } = useOutletContext<OutletContextType>();

  // const { user} = useOutletContext<OutletContextType>();
  // const [user, setUser] = useState<User | null>(null);
const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
const token = localStorage.getItem("token");

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    console.log(`start`);

    // if (!password.trim()) {
    //   setMessage('Password field cannot be empty');
    //   return;
    // }

    // if (!newEmail.trim()) {
    //   setMessage('New email field cannot be empty');
    //   return;
    // }

    try {
      const res = await fetch(
        `https://team-project-backend-production.up.railway.app/users/me/email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password, newEmail }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(data.message);
      setPassword('');
      setNewEmail('');
    } catch {
      setLoading(false);
      setMessage('Зміни не надіслано.Сервер не відповідає');
    }
  };

  return (
    <>
      <form className="change-password" onSubmit={handleChangeEmail}>
        {/* <form className="change-password" > */}
        {/* <div className="input-wrapper profile__input"> */}
          <div className="input-wrapper profile__input">
          {hidePassword ? (
            <>
              <input
                // id="password"
                type="password"
                className="input-style "
                placeholder="Введіть старий пароль"
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
                placeholder="Введіть старий пароль"
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
        {/* </div> */}
        
        <div className="input-wrapper profile__input">
          <input
            type="email"
            className="input-style"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Введіть новий email"
          />
        </div>
        <button
          type="submit"
          className="profileButton"
          // style={{ width: '120px' }}
          //disabled={loading}
        >
          {loading ? "Надсилається" : "Надіслати"}
        </button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </>
  );
};
