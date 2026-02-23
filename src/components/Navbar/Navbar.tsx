import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import React, { useEffect, useState } from 'react';
import { LuHeart } from 'react-icons/lu';
// import { LuShoppingBag } from 'react-icons/lu';
import { LuMenu } from 'react-icons/lu';

//import Menu from '../Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import Badge from '@mui/material/Badge';
import CitySelect from '../CitySelect/CitySelect';
//import QueryInput from '../QueryInput/QueryInput';
//import CityFilter from '../CityFilter/CityFilter';
import { getFavoritesQuantity } from '../../features/favorites';
//import { getTotals } from '../../features/cart';

import Logo from '../Logo/Logo';


export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-underline': isActive });
  const favoriteTotalQuantity = useSelector(
    (state: RootState) => state.favorites.favoriteTotalQuantity,
  );

  // const cartTotalQuantity = useSelector(
  //   (state: RootState) => state.cart.cartTotalQuantity,
  // );
  const dispatch = useDispatch();

  //const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.favoriteItems,
  );
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
 //const [activeCity, setActiveCity] = useState('Ukraine');
  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [dispatch, cartItems]);


  useEffect(() => {
    dispatch(getFavoritesQuantity());
  }, [dispatch, favoriteItems]);

  return (
    <>
      <nav className="navbar">
        {/* <div className="navbar__logo__search"> */}
        <div>
          <NavLink to="/">
            {/* <img src="./img/transparent.png" alt="company_logo" /> */}
            <Logo />
          </NavLink>
        </div>

        {/* <div className="navbar__query">
          <input
            type="text"
            className="input-style"
            placeholder="Яку подію бажаєш відвідати?"
          />
          <div className="searchButton">Пошук</div>
        </div> */}
        {/* </div>
<div className="navbar__rest"> */}
        <CitySelect />

        {/* <div className="navbar__link__container">

            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>

            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </div> */}
        {/* </div> */}
        {/* <div > */}
        {/* <NavLink to="/cart" className="registered__events">
          Мої записи
        </NavLink> */}

        <NavLink to="/favorites" className="favorite__events ">
          <Badge
            badgeContent={favoriteTotalQuantity || 0}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.5rem',
                width: '18px',
                height: '18px',
                minWidth: '18px', // ensures consistency
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          >
            <LuHeart
              className="heart-favorite"
              // style={{
              //   width: '30px',
              //   height: '30px',
              //   fill: '#d57eeb',
              //   stroke: '#AA5486',
              //   filter: 'inset 2px 2px 4px rgba(177, 30, 230, 0.5)',
              // }}
            />
          </Badge>
        </NavLink>

        <NavLink to="/form" className="advertise">
          {/* <Badge
              //badgeContent={cartTotalQuantity}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.5rem',
                  width: '16px',
                  height: '16px',
                  minWidth: '16px', // ensures consistency
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <LuShoppingBag size={18} />
            </Badge> */}
          Додати оголошення
        </NavLink>

        <NavLink to="/profile" className="advertise">
          Профіль
        </NavLink>

        <NavLink to="/login" className="advertise">
          Увійти
        </NavLink>

        <NavLink to="/menu" className="burger-menu">
          <LuMenu />
        </NavLink>
        {/* </div> */}
      </nav>

      {/* {isMenuOpen && (
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )} */}
    </>
  );
};
