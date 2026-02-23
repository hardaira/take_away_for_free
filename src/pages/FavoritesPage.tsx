import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store'; // adjust if your root store path is different
import { ProductCard } from '../components/ProductCard/ProductCard';
import { getFavoritesQuantity } from '../features/favorites';
// import { IoIosArrowForward } from 'react-icons/io';
// import { LuHouse } from 'react-icons/lu';
// import { Link } from 'react-router-dom';
import TopBackLink from '../components/TopBackLink/TopBackLink';
// import { Footer } from '../components/Footer/Footer';
import './FavoritesPage.scss';
export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();

  // Destructure values from the cart slice
  const { favoriteItems, favoriteTotalQuantity } = useSelector(
    (state: RootState) => state.favorites,
  );

  // Recalculate totals whenever cartItems change
  useEffect(() => {
    dispatch(getFavoritesQuantity());
  }, [favoriteItems, dispatch]);

  return (
    <div className="section" id="favorites">
      <div className="favorites">
        {/* <div className="top__back__link">
          {/* <Link to="/home" className="icon__house">
            <LuHouse color="#AA5486" />
          </Link> */}
        {/* <Link to="/home" className="top__back__link">
            <LuHouse color="#AA5486" />
            <p>На головну</p>
          </Link>
      </div> */}
        <TopBackLink />
        <h1 className="heading-favorites">Favorites </h1>
        <p className="under__heading1">{favoriteTotalQuantity} items</p>
        {favoriteItems.length === 0 ? (

            <p>Поки що немає обраних товарів.</p>

        ) : (
          <div className="cards__container">
            {favoriteItems.map((product: Product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
