import React from 'react';
import { Link } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
import { useNavigate, useOutletContext } from "react-router-dom";
import './Menu.scss';
export const MenuPage: React.FC = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { setUser } = useOutletContext<any>();
const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate(`/login`);
  };

  return (
    <div className="section">
       <TopBackLink />
      <div className="container menu">
       
        <Link
          to={user ? `/profile/${user.id}/add-post` : "/form"}
          className="in_menu"
        >
          Додати оголошення
        </Link>
        <Link to={`/profile/${user?.id ?? "undefined"}`} className="in_menu">
          Профіль
        </Link>

        {user ? (
          <Link to="/login" className="in_menu" onClick={handleLogout}>
            Вийти
          </Link>
        ) : (
          <Link to="/login" className="in_menu">
            Увійти
          </Link>
        )}
      </div>
    </div>
  );
}