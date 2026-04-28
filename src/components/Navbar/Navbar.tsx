import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import { useEffect, useState } from 'react';
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
import { useNavigate, useOutletContext } from "react-router-dom";
import Logo from '../Logo/Logo';
// type OutletContextType = {
//   user: { id: number } | null;
//   setUser: (user: { id: number } | null) => void;
// };

export const Navbar = ({setUser}) => {
  // const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  //   classNames('navbar-item', { 'has-underline': isActive });
  //const { user, setUser } = useOutletContext<OutletContextType>();
   const userString = localStorage.getItem("user");
   const user = userString ? JSON.parse(userString) : null;
   const [favoritesCount, setFavoritesCount] = useState(0);
  const navigate = useNavigate();
  //const { user, setUser } = useOutletContext<any>();
  //const { user } = useOutletContext<any>();
  // const favoriteTotalQuantity = useSelector(
  //   (state: RootState) => state.favorites.favoriteTotalQuantity
  // );

  // const cartTotalQuantity = useSelector(
  //   (state: RootState) => state.cart.cartTotalQuantity,
  // );
  //const dispatch = useDispatch();

  //const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  // const favoriteItems = useSelector(
  //   (state: RootState) => state.favorites.favoriteItems
  // );
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [activeCity, setActiveCity] = useState('Ukraine');
  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [dispatch, cartItems]);

  const loadFavoritesCount = () => {
    if (!user) {
      setFavoritesCount(0);
      return;
    }

    const key = `favorites_${user.id}`;
    const stored = localStorage.getItem(key);
    const favorites = stored ? JSON.parse(stored) : [];

    setFavoritesCount(favorites.length);
  };

  useEffect(() => {
    loadFavoritesCount();

    window.addEventListener("favoritesUpdated", loadFavoritesCount);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavoritesCount);
    };
  }, [user]);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate(`/login`);
  };



  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink to="/#">
            <Logo />
          </NavLink>
        </div>

        <CitySelect />

        <NavLink
          to={user ? `/favorites/${user.id}` : "/favorites/undefined"}
          className="favorite__events "
        >
          <Badge
            badgeContent={favoritesCount}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#4a6fa5",
                fontSize: "0.5rem",
                width: "18px",
                height: "18px",
                minWidth: "18px", // ensures consistency
                borderRadius: "50%",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <LuHeart
              className="heart-favorite"
            />
          </Badge>
        </NavLink>

        <NavLink
          to={user ? `/profile/${user.id}/add-post` : "/form"}
          className="advertise"
        >
          Додати оголошення
        </NavLink>

        <NavLink
          to={`/profile/${user?.id ?? "undefined"}`}
          className="advertise"
        >
          Профіль
        </NavLink>

        {user ? (
          <NavLink to="/login" className="advertise" onClick={handleLogout}>
            Вийти
          </NavLink>
        ) : (
          <NavLink to="/login" className="advertise">
            Увійти
          </NavLink>
        )}

        <NavLink to="/menu" className="burger-menu">
          <LuMenu />
        </NavLink>
      </nav>
    </>
  );
};
