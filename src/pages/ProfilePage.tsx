import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
import './ProfilePage.scss';
export const ProfilePage: React.FC = () => (
  <div className="section">
    <div className="container">
      {/* <h1>Hello, {user.name}</h1> */}
      <TopBackLink />
        <h1>, вітаємо на сторінці профілю!</h1>
        {/* <button>Вийти</button> */}

      <div className="profile_buttons">
        <div>
          <Link to="change-password" className="profileButton">
            Змінити пароль
          </Link>
        </div>
        <div>
          <Link to="change-email" className="profileButton">
            Змінити email
          </Link>
        </div>
        <div>
          <Link to="add-post" className="profileButton">
            Додати оголошення
          </Link>
        </div>
        <div>
          <Link to="my-posts" className="profileButton">
            Мої оголошення
          </Link>
        </div>

      </div>
      {/* <Outlet context={{ user, setUser }} /> */}
      <Outlet/>
    </div>
  </div>
);
