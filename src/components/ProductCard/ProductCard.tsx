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
import { HiOutlineSave } from "react-icons/hi";
import { useDispatch } from 'react-redux';
//import { Product} from '../../types/product';
//import { addToFavorites, removeFromFavorites } from '../../features/favorites';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
// import { removeFromCart } from '../../features/cart';
import { NavLink } from 'react-router-dom';
//import { useOutletContext } from "react-router-dom";
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
  onDelete?: (id: number) => void;
  onSave?: (id: number) => void;
}
export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  contact: string;
  image?: string; // 👈 optional
};

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
  inProfile = false,
  onDelete,
  onSave,
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
  const [loading, setLoading] = useState(false);
  //const [myProducts, setMyProducts] = useState([]);
  const [favotites, setFavorites] = useState([]);
  
  const token = localStorage.getItem("token");

  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCity, setEditedCity] = useState(city);
  const [editedContact, setEditedContact] = useState(contact || "");
  //const [inProfile, setInProfile] = useState(false);
  const [showDetails, setShowDetails] = useState(showFullDetails);

  const [myFavoriteProducts, setMyFavoriteProducts] = useState([]);
  // const isInFavorites = useSelector((state: RootState) =>
  //   state.favorites.favoriteItems.some(item => item.title === product.title),
  // );

  // const isInCart = useSelector((state: RootState) =>
  //   state.cart.cartItems.some(item => item.name === product.title),
  // );
  // const handleAddToCart = () => {
  //   dispatch(addToCart(product));
  // };

  // const handleAddToFavorites = () => {
  //   dispatch(addToFavorites(product));
  // };

  // const handleRemoveFromFavorites = () => {
  //   dispatch(removeFromFavorites(product));
  // };

  // const handleRemoveFromCart = (cartItem: string) => {
  //   dispatch(removeFromCart(cartItem));
  // };


  const handleAddToFavorites = (product: Product) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      alert("Please login");
      return;
    }

    const key = `favorites_${user.id}`;
    const existing = localStorage.getItem(key);
    const favorites = existing ? JSON.parse(existing) : [];

    const alreadyExists = favorites.find(
      (item: Product) => item.id === product.id
    );
    if (alreadyExists) return;

    const updated = [...favorites, product];
    localStorage.setItem(key, JSON.stringify(updated));
  };


const handleRemoveFromFavorites = (productId: string) => {
  if (!user) return;

  const key = `favorites_${user.id}`;

  // get current favorites
  const existing = localStorage.getItem(key);
  const favorites: Product[] = existing ? JSON.parse(existing) : [];

  // remove item
  const updated = favorites.filter((item) => item.id !== productId);

  // save back
  localStorage.setItem(key, JSON.stringify(updated));

  // update UI
  setFavorites(updated);
};
//const handleUpdatePost = async (
  //   productId: number,
  //   //messageAuthor: string,
  //   editedTitle: string,
  //   editedCategory: string,
  //   editedDescription: string,
  //   editedCity: string,
  //   editedContact: string
  // ) => {
  //   if (!user) {
  //     console.log("Ви повинні увійти в систему");
  //     return;
  //   }

  //   try {
  //     // Make the PUT request to update the room title
  //     const updateRes = await fetch(
  //       `https://team-project-backend-production.up.railway.app/products/${productId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           title: editedTitle || product.title,
  //           category: editedCategory || product.category,
  //           description: editedDescription || product.description,
  //           city: editedCity || product.city,
  //           contact: editedContact || product.contact,
  //         }),
  //       }
  //     );

  //     if (!updateRes.ok) {
  //       const data = await updateRes.json();
  //       alert(data.message || "Failed to update message");
  //       //setEditText(null);

  //       // return;
  //     }

  //     // Update the state to reflect the room update
  //     setMyProducts((myProducts) =>
  //       myProducts.map((p) =>
  //         p.id === productId
  //           ? {
  //               ...p,
  //               title: editedTitle,
  //               category: editedCategory,
  //               description: editedDescription,
  //               city: editedCity,
  //               contact: editedContact,
  //             }
  //           : p
  //       )
  //     );

  //     // Exit edit mode after successful update
  //     //setEditText(null);
  //   } catch (err) {
  //     alert("Failed to update room");
  //     //setEditText(null);
  //   }
  // };

  const toggleFavorite = (productId) => {
    setMyFavoriteProducts((prev) => {
      if (prev.includes(productId)) {
        // remove
        return prev.filter((id) => id !== productId);
      } else {
        // add
        return [...prev, productId];
      }
    });
  };

 localStorage.setItem("favorite_products", JSON.stringify(myFavoriteProducts));
 console.log(myFavoriteProducts);
  const isFavorite = myFavoriteProducts.includes(product.id);
  
  return (
    <div className="product__card">
      {/* <NavLink to={`/${category}/${id}`} className="card-image"> */}
      <div className="card-image">
        <img
          className="product__card__img"
          src={`./${image}`}
          alt="Product photo"
        />
        {/* {isInFavorites ? (
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
          <button className="icon icon__heart" onClick={handleAddToFavorites}>
            <HiOutlineHeart
              style={{
                width: "20px",
                height: "20px",
                fill: "white",
                stroke: "white",
              }}
            />
          </button>
        )} */}
        <button
          className="icon icon__heart"
          onClick={() => toggleFavorite(id)}
        >
          {isFavorite ? (
            <HiOutlineHeart
              //className="selected"
              style={{
                width: "20px",
                height: "20px",
                fill: "#4a6fa5",
                stroke: "#4a6fa5",
              }}
            />
          ) : (
            <HiOutlineHeart
              //className="icon icon__heart"
              style={{
                width: "20px",
                height: "20px",
                fill: "white",
                stroke: "white",
              }}
            />
          )}
        </button>
      </div>

      <div className="card-content">
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h2 className="product__title ">{title}</h2>
        )}
        {/* <h2 className="product__title ">{title}</h2> */}
        <p className="info">
          <HiOutlineBookmark
            style={{ width: "14px", height: "14px", color: "#A2A5A6" }}
          />
          {isEditing ? (
            <input
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
          ) : (
            <span className="product__location">{category}</span>
          )}
          {/* <span className="product__location">{category}</span> */}
        </p>
        <p className="info">
          <HiOutlineLocationMarker
            style={{ width: "14px", height: "14px", color: "#A2A5A6" }}
          />
          {isEditing ? (
            <input
              value={editedCity}
              onChange={(e) => setEditedCity(e.target.value)}
            />
          ) : (
            <span className="product__location">{city}</span>
          )}
          {/* <span className="product__location">{city}</span> */}
        </p>

        {showDetails ? (
          <>
            <p className="info">
              <HiOutlineUserCircle
                style={{ width: "14px", height: "14px", color: "#A2A5A6" }}
              />
              {isEditing ? (
                <input
                  value={editedContact}
                  onChange={(e) => setEditedContact(e.target.value)}
                />
              ) : (
                <span className="places__left">{contact}</span>
              )}
              {/* <span className="places__left">{contact}</span> */}
            </p>
            {isEditing ? (
              <input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <span className="product__description">{description}</span>
            )}
            {/* <p className="product__description">{description}</p> */}
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
          </div>
        )}

        <div className="buttons">
          {inProfile && (
            <div className="in_profile">
              <button
                className="icon icon__edit selected"
                title="Редагувати"
                onClick={() => setIsEditing(true)}
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
                className="icon icon__save selected"
                title="Зберегти зміни"
                disabled={!isEditing}
                onClick={() => {
                  onSave?.(
                    id,
                    editedTitle,
                    editedCategory,
                    editedDescription,
                    editedCity,
                    editedContact
                  );
                  setIsEditing(false);
                }}
              >
                <HiOutlineSave
                  style={{
                    width: "20px",
                    height: "20px",
                    stroke: "#4a6fa5",
                  }}
                />
              </button>

              <button
                className="icon icon__delete selected"
                title="Видалити оголошення"
                onClick={() => onDelete?.(id)}
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
