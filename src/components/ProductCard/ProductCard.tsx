import './ProductCard.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { LuHeart } from 'react-icons/lu';
// import { CiWallet } from 'react-icons/ci';
// import { CiLocationOn } from 'react-icons/ci';
// import { CiCalendar } from 'react-icons/ci';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi2';
// import { HiOutlineWallet } from "react-icons/hi2";
import { HiOutlineHeart } from 'react-icons/hi';
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2';
import { HiOutlineBookmark } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart';
import { addToFavorites, removeFromFavorites } from '../../features/favorites';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { removeFromCart } from '../../features/cart';
import { NavLink } from 'react-router-dom';
interface ProductCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  location_city: string;
  contact: string;
  image: string;
  showFullDetails?: boolean;
}

// interface ProductCardProps {
//   product: Product;
// }

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  category,
  description,
  location_city,
  contact,
  image,
  showFullDetails = false,
}) => {
  const dispatch = useDispatch();

  const product = {
    id,
    title,
    category,
    description,
    location_city,
    contact,
    image,
    // showFullDetails: false,
  };
  
  const navigate = useNavigate();
  const [inProfile, setInProfile] = useState(false);
  const [showDetails, setShowDetails] = useState(showFullDetails);
  const isInFavorites = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some(item => item.title === product.title),
  );

  // const isInCart = useSelector((state: RootState) =>
  //   state.cart.cartItems.some(item => item.name === product.title),
  // );
  // const handleAddToCart = () => {
  //   dispatch(addToCart(product));
  // };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(product));
  };

  // const handleRemoveFromCart = (cartItem: string) => {
  //   dispatch(removeFromCart(cartItem));
  // };

  return (
    <div className="product__card">
      <NavLink
        to={`/${category}/${id}`}
        className="card-image"
      >
        <img
          className="product__card__img"
          src={`./${image}`}
          alt="Product photo"
        />
      </NavLink>

      <div className="card-content">
        <h2 className="product__title ">{title}</h2>
        <p className="info">
          <HiOutlineBookmark
            style={{ width: '14px', height: '14px', color: '#A2A5A6' }}
          />
          <span className="product__location">{category}</span>
        </p>
        <p className="info">
          <HiOutlineLocationMarker
            style={{ width: '14px', height: '14px', color: '#A2A5A6' }}
          />
          <span className="product__location">{location_city}</span>
        </p>
        {/* <p className="info">
          <HiOutlineCalendar
            style={{ width: '14px', height: '14px', color: '#A2A5A6' }}
          />
          <span className="product__date">{expire}</span>
        </p> */}
        {/* <p className="info">
          <HiOutlineWallet
            style={{ width: '14px', height: '14px', color: '#A2A5A6' }}
          />
          <span className="product__price">{price}</span>
        </p> */}

        {showDetails ? (
          <>
            <p className="info">
              <HiOutlineUserCircle
                style={{ width: '14px', height: '14px', color: '#A2A5A6' }}
              />
              <span className="places__left">{contact}</span>
            </p>
            <p className="product__description">{description}</p>
          </>
        ) : (
          <div className="main_page_card_buttons">
            <div
              className="addButton"
              onClick={() => {
                navigate(`/product/${id}`);
                setShowDetails(true);
              }}
            >
              Повний опис
            </div>
            {isInFavorites ? (
              <button
                className="icon icon__heart selected"
                onClick={handleRemoveFromFavorites}
              >
                <HiOutlineHeart
                  style={{
                    width: '20px',
                    height: '20px',
                    fill: 'rgb(16, 91, 16)',
                    stroke: 'rgb(16, 91, 16)',
                  }}
                />
              </button>
            ) : (
              <button
                className="icon icon__heart"
                onClick={handleAddToFavorites}
              >
                <HiOutlineHeart
                  style={{
                    width: '20px',
                    height: '20px',
                    fill: 'orange',
                    stroke: 'orange',
                  }}
                />
              </button>
            )}
          </div>
        )}
        {/* <div className="card__tech__spec">
          {[
            { label: 'Screen', key: 'screen' },
            { label: 'Capacity', key: 'capacity' },
            { label: 'RAM', key: 'ram' },
          ].map(({ label, key }) => {
            const value = product[key as keyof typeof product];

            return value ? (
              <div className="product__info" key={key}>
                <span className="feature">{label}:</span>
                <span className="feature__info">{value}</span>
              </div>
            ) : null;
          })}
        </div> */}

        <div className="buttons">
          {/* {isInCart ? (
            <button
              className="addButton selected"
              onClick={() => handleRemoveFromCart(product)}
            >
              Запис додано
            </button>
          ) : (
            <button className="addButton" onClick={handleAddToCart}>
              Записатися
            </button>
          )} */}

          {inProfile && (
            <div className="in_profile">
              <button
                className="icon icon__heart selected"
                // onClick={handleRemoveFromFavorites}
              >
                <HiOutlinePencil
                  style={{
                    width: '20px',
                    height: '20px',
                    // fill: 'rgb(16, 91, 16)',
                    stroke: 'rgb(16, 91, 16)',
                  }}
                />
              </button>
              {/* ) : (
              <button
                className="icon icon__heart"
                onClick={handleAddToFavorites}
              >
                <HiOutlinePencil
                  style={{
                    width: '20px',
                    height: '20px',
                    fill: 'orange',
                    stroke: 'orange',
                  }}
                />
              </button> */}
              <button
                className="icon icon__heart selected"
                // onClick={handleRemoveFromFavorites}
              >
                <HiOutlineArchiveBoxXMark
                  style={{
                    width: '20px',
                    height: '20px',
                    // fill: 'rgb(16, 91, 16)',
                    stroke: 'rgb(16, 91, 16)',
                  }}
                />
              </button>
              {/* ) : (
              <button
                className="icon icon__heart"
                onClick={handleAddToFavorites}
              >
                <HiOutlinePencil
                  style={{
                    width: '20px',
                    height: '20px',
                    fill: 'orange',
                    stroke: 'orange',
                  }}
                />
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
