import './ProductCard.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { LuHeart } from 'react-icons/lu';
// import { CiWallet } from 'react-icons/ci';
// import { CiLocationOn } from 'react-icons/ci';
// import { CiCalendar } from 'react-icons/ci';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineUserCircle } from 'react-icons/hi';
// import { HiOutlineCalendar } from 'react-icons/hi2';
// import { HiOutlineWallet } from "react-icons/hi2";
import { HiOutlineHeart } from 'react-icons/hi';
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2';
import { HiOutlineBookmark } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
// import { addToCart } from '../../features/cart';
import { addToFavorites, removeFromFavorites } from '../../features/favorites';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
// import { removeFromCart } from '../../features/cart';
import { NavLink } from 'react-router-dom';
interface ProductCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  city: string;
  contact: string;
  image: string;
  showFullDetails?: boolean;
  inProfile?: boolean;
}

// interface ProductCardProps {
//   product: Product;
// }

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  category,
  description,
  city,
  contact,
  image,
  showFullDetails = false,
  inProfile = false
}) => {
  const dispatch = useDispatch();

  const product = {
    id,
    title,
    category,
    description,
    city,
    contact,
    image,
    // showFullDetails: false,
  };

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  const navigate = useNavigate();
  //const [inProfile, setInProfile] = useState(false);
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

  const handleRemovePost = () => { 

    console.log("Removed");
  };
  return (
    <div className="product__card">
      <NavLink to={`/${category}/${id}`} className="card-image">
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
            style={{ width: "14px", height: "14px", color: "#A2A5A6" }}
          />
          <span className="product__location">{category}</span>
        </p>
        <p className="info">
          <HiOutlineLocationMarker
            style={{ width: "14px", height: "14px", color: "#A2A5A6" }}
          />
          <span className="product__location">{city}</span>
        </p>
        

        {showDetails ? (
          <>
            <p className="info">
              <HiOutlineUserCircle
                style={{ width: "14px", height: "14px", color: "#A2A5A6" }}
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
                //navigate(`/product/${id}`);
                navigate(user ? `/product/${id}` : "/details");
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
                    width: "20px",
                    height: "20px",
                    fill: "#4a6fa5",
                    stroke: "#4a6fa5",
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
                    width: "20px",
                    height: "20px",
                    fill: "white",
                    stroke: "white",
                  }}
                />
              </button>
            )}
          </div>
        )}


        <div className="buttons">

          {inProfile && (
            <div className="in_profile">
              <button
                className="icon icon__heart selected"
                title="Редагувати"
                // onClick={handleEditPost}
              >
                <HiOutlinePencil
                  style={{
                    width: "20px",
                    height: "20px",
                    stroke: "#4a6fa5",
                  }}
                />
              </button>

              <button
                className="icon icon__heart selected"
                onClick={handleRemovePost}
              >
                <HiOutlineArchiveBoxXMark
                  style={{
                    width: "20px",
                    height: "20px",
                    stroke: "#4a6fa5",
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
