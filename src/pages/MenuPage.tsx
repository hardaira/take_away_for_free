import React from 'react';
import { Link } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
import { useNavigate, useOutletContext } from "react-router-dom";
import './Menu.scss';
export const MenuPage: React.FC = () => {
  // const userString = localStorage.getItem("user");
  // const user = userString ? JSON.parse(userString) : null;
  const { user, setUser } = useOutletContext<any>();
const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate(`/login`);
  };

  return (
    <div className="section">
      <div className="container menu">
        <TopBackLink />
        <Link to="/form" className="in_menu">
          Додати оголошення
        </Link>

        <Link to="/profile" className="in_menu">
          Профіль
        </Link>

        {user ? (
          <NavLink to="/login" className="advertise" onClick={handleLogout}>
            Вийти
          </NavLink>
        ) : (
          <NavLink to="/login" className="advertise">
            Увійти
          </NavLink>
        )}
      </div>
    </div>
  );
}