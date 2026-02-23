import React from 'react';
import { Link } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
import './Menu.scss';
export const MenuPage: React.FC = () => (
  <div className="section">
    <div className="container menu">
      <TopBackLink />
      <Link to="/form" className="in_menu">
        Додати оголошення
      </Link>

      <Link to="/profile" className="in_menu">
        Профіль
      </Link>

      <Link to="/login" className="in_menu">
        Увійти
      </Link>
    </div>
  </div>
);
