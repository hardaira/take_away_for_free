import React, {useState, useEffect} from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
import cn from "classnames";
import './ProfilePage.scss';
import { useOutletContext } from "react-router-dom";
export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: number }>();
  // const navigate = useNavigate();
  const { user, setUser } = useOutletContext<any>();

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  console.log(`user is ${userId}`);
  useEffect(() => {
    if (!userId || !token) return;
    console.log(`accessToken is ${token}`);
    fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // optional (only needed if cookies involved)
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [userId, accessToken]);
  return (
    <div className="section">
      <div className="container">
        {/* <h1>Hello, {user.name}</h1> */}
        <TopBackLink />
        <h1>{user.name}, вітаємо на сторінці профілю!</h1>
        {/* <button>Вийти</button> */}

        <div className="profile_buttons">
          <div>
            <NavLink
              to="change-password"
              className={({ isActive }) =>
                cn("profileButton", { buttonPressed: isActive })
              }
            >
              Змінити пароль
            </NavLink>
          </div>
          <div>
            <NavLink
              to="change-email"
              className={({ isActive }) =>
                cn("profileButton", { buttonPressed: isActive })
              }
            >
              Змінити email
            </NavLink>
          </div>
          <div>
            <NavLink
              to="add-post"
              className={({ isActive }) =>
                cn("profileButton", { buttonPressed: isActive })
              }
            >
              Додати оголошення
            </NavLink>
          </div>
          <div>
            <NavLink
              to="my-posts"
              className={({ isActive }) =>
                cn("profileButton", { buttonPressed: isActive })
              }
            >
              Мої оголошення
            </NavLink>
          </div>
        </div>
        {/* <Outlet context={{ user, setUser }} /> */}
        <Outlet />
      </div>
    </div>
  );
}