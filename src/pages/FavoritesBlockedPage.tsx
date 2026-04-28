import "./InformationPage.scss";
// import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TopBackLink from "../components/TopBackLink/TopBackLink";
// import { useSelector, useDispatch } from 'react-redux';
// import { selectAllProducts, addProduct } from '../features/products';

export const FavoritesBlockedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="section">
      <div className="container">
        <TopBackLink />
        <div className="centered">
          <div className="form__box__login">
            <h2>Увага</h2>
            <p>
              Щоб побачити інформацію про вибрані продукти, потрібно
              увійти.
            </p>
            <p className="login_link" onClick={() => navigate("/login")}>
              Увійти
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesBlockedPage;
