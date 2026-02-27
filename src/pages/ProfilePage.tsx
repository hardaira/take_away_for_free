import React, {useState} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
import cn from "classnames";
import './ProfilePage.scss';
export const ProfilePage: React.FC = () => {
  const [ pressed, setPressed ] = useState(false);
  return (
    <div className="section">
      <div className="container">
        {/* <h1>Hello, {user.name}</h1> */}
        <TopBackLink />
        <h1>, вітаємо на сторінці профілю!</h1>
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