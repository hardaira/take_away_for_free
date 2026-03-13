import "./InformationPage.scss";
// import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { selectAllProducts, addProduct } from '../features/products';

export const DetailsBlockedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="section">
      <div className="container">
        <div className="centered">
          <div className="form__box__login">
            <p>
              Щоб побачити повну інформацію про продукт  потрібно зареєструватись і увійти на сторінку профілю .
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

export default DetailsBlockedPage;
