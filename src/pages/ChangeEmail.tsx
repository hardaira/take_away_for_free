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
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
const token = localStorage.getItem("token");

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setLoading(true);
    console.log(`start`);

    const passwordRegex =
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

 if (!password.trim() || !newEmail.trim()) {
   setError("Всі поля повинні бути заповнені");
   setLoading(false);
   return;
 }

//  if (!passwordRegex.test(password)) {
//    setError("Новий пароль не відповідає вимогам");
//    setLoading(false);
//    return;
//  }

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

      if (res.status === 500 || res.status === 400) {
        setError(data.Error);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        //setMessage(data.message);
        return;
      }

      setSuccessMessage(data.message);
      setError('');
      setPassword('');
      setNewEmail('');
      setLoading(false);
    } catch {
      setLoading(false);
      setError('Зміни не надіслано.Сервер не відповідає');
      setSuccessMessage('');
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
                placeholder="Введіть свій пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                placeholder="Введіть свій пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <IoEyeOffOutline
                style={{ marginRight: "16px", cursor: "pointer" }}
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
        <button type="submit" className="profileButton" disabled={loading}>
          {loading ? "Надсилається" : "Надіслати"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginBottom: "20px"}}>{error}</p>}
      {successMessage && <p style={{ color: "green", marginBottom: "20px"}}>{successMessage}</p>}
    </>
  );
};
