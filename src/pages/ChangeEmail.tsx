// import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
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

  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, _setMessage] = useState('');
  const [loading, _setLoading] = useState(false);
  // const handleChangeEmail = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage('');
  //   setLoading(true);

  //   // if (!password.trim()) {
  //   //   setMessage('Password field cannot be empty');
  //   //   return;
  //   // }

  //   // if (!newEmail.trim()) {
  //   //   setMessage('New email field cannot be empty');
  //   //   return;
  //   // }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/users/${user.id}/change-email`,
  //       {
  //         method: 'PATCH',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ password, newEmail }),
  //       },
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setMessage(data.message);
  //       return;
  //     }

  //     setMessage(data.message);
  //     setPassword('');
  //     setNewEmail('');
  //   } catch {
  //     setLoading(false);
  //     setMessage('Зміни не надіслано.Сервер не відповідає');
  //   }
  // };

  return (
    <>
      {/* <form onSubmit={handleChangeEmail}> */}
      <form className="change-password" >
        <div className="input-wrapper">
          <input
            type="password"
            className="input-style"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Введіть свій пароль"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            className="input-style"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            placeholder="Введіть новий email"
          />
        </div>
        <button
          type="submit"
          className="profileButton"
          // style={{ width: '120px' }}
          disabled={loading}
        >
          {loading ? 'Надсилається' : 'Надіслати'}
        </button>
      </form>

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </>
  );
};
