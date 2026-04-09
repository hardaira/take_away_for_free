import './LoginPage.scss';
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import TopBackLink from "../components/TopBackLink/TopBackLink";
import { useNavigate, useOutletContext } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
};

type OutletContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true); 

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!email.trim() || !password.trim()) {
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
        "https://team-project-backend-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

if (res.status === 500 ) {   
  setError(data.Error);
  setLoading(false);
        return;
      }

      if (!res.ok) {
        setMessage(data.Error);
        setLoading(false);
        return;
      }

      // ✅ store token
      // localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      // ✅ store ONLY user data (no token, no password)
      // setUser({
      //   id: data.id,
      //   name: data.name,
      //   email: data.email,
      // });

      console.log(data);
      setUser(data);

      navigate(`/profile/${data.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Сервер не відповідає");
    }
  };

  return (
    <div className="section">
      <div className="container">
        <TopBackLink />
        <div className="centered">
          <div className="form__box__login">
            <h2>Вхід</h2>
            {/* <form onSubmit={handleLogin}> */}
            <form className="registration__box" onSubmit={handleLogin}>
              {/* <label htmlFor="email">Email</label> */}
              <div className="input-wrapper">
                <input
                  // id="email"
                  type="email"
                  className="input-style"
                  placeholder="Введіть свій email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* <label htmlFor="password">Пароль</label> */}

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

            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

            <p>Немає облікового запису?</p>

            <div className="login_links">
              <p
                className="login_link"
                onClick={() => navigate("/registration")}
              >
                Зареєструватись
              </p>

              <p
                className="login_link"
                onClick={() => navigate("/reset-password")}
              >
                Забули пароль?
              </p>
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
