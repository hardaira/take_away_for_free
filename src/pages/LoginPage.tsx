import './LoginPage.scss';
import React, { useState } from "react";
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
  const [loginError, setLoginError] = useState("");
const [message, setMessage] = useState("");
  const { setUser } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");

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

      if (!res.ok) {
        setMessage(data.message);
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
      setLoginError("Сервер не відповідає.");
    }
  };

  return (
    <div className="section">
      <div className="container">
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
                  <input
                    // id="password"
                    type="password"
                    className="input-style"
                    placeholder="Введіть свій пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p className="rule">
                  Пароль має містити мінімум 8 знаків (хоча б одну велику літеру (A-Z), хоча б одну
                  малу літеру (a-z), хоча б одну цифру, хоча б один спецсимвол (
                  @$!%*?&.#_-))
                </p>
              </div>

              <button type="submit" className="loginButton">
                Підтвердити
              </button>
            </form>

            {loginError && <p style={{ color: "red" }}>{loginError}</p>}

            <p>Немає облікового запису?</p>

            <div className="login_links">
            <p
            className="login_link"
            onClick={() => navigate("/registration")} >
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
