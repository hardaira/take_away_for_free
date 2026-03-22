import React, { useEffect, useState } from "react";
import TopBackLink from "../components/TopBackLink/TopBackLink";
import { ProductCard } from "../components/ProductCard/ProductCard";
//import "./FavoritesPage.scss";

// --- TYPES ---
export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  contact: string;
  image?: string; // 👈 optional
};
// --- COMPONENT ---
export const FavoritesPage: React.FC = () => {
  // const [favorites, setFavorites] = useState<Product[]>([]);

  // // --- GET USER ---
  // const userString = localStorage.getItem("user");
  // const user = userString ? JSON.parse(userString) : null;

  // // --- STORAGE HELPERS (inside same file) ---
  // const getFavorites = (userId: string): Product[] => {
  //   const data = localStorage.getItem(`favorites_${userId}`);
  //   return data ? JSON.parse(data) : [];
  // };

  // const saveFavorites = (userId: string, items: Product[]) => {
  //   localStorage.setItem(`favorites_${userId}`, JSON.stringify(items));
  // };

  // const removeFavorite = (productId: string) => {
  //   if (!user) return;

  //   const updated = favorites.filter((item) => item.id !== productId);
  //   saveFavorites(user.id, updated);
  //   setFavorites(updated);
  // };

  // // --- LOAD FAVORITES ---
  // useEffect(() => {
  //   if (user) {
  //     const data = getFavorites(user.id);
  //     setFavorites(data);
  //   }
  // }, [user]);

  // --- RENDER ---

  const favorites = localStorage.getItem("favorite_products");

  return (
    <div className="section" id="favorites">
      <div className="favorites">
        <TopBackLink />

        <h1 className="heading-favorites">Вибране</h1>

        <p className="under__heading1"> обраних товарів</p>
      </div>
    </div>
  );
};

        {/* {favorites.length === 0 ? (
          <p>Поки що немає обраних товарів.</p>
        ) : (
          <div className="cards__container">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                //onRemove={() => removeFavorite(product.id)} // optional
              />
            ))}
          </div> 
        )}/ *}
      </div>
    </div>
  );
};

export default FavoritesPage;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState } from '../app/store'; // adjust if your root store path is different
// import { ProductCard } from '../components/ProductCard/ProductCard';
// import { getFavoritesQuantity } from '../features/favorites';
// // import { IoIosArrowForward } from 'react-icons/io';
// // import { LuHouse } from 'react-icons/lu';
// // import { Link } from 'react-router-dom';
// import TopBackLink from '../components/TopBackLink/TopBackLink';
// // import { Footer } from '../components/Footer/Footer';
// import './FavoritesPage.scss';
// export const FavoritesPage: React.FC = () => {
//   const dispatch = useDispatch();

//   // Destructure values from the cart slice
//   const { favoriteItems, favoriteTotalQuantity } = useSelector(
//     (state: RootState) => state.favorites,
//   );

//   // Recalculate totals whenever cartItems change
//   useEffect(() => {
//     dispatch(getFavoritesQuantity());
//   }, [favoriteItems, dispatch]);

//   //const token = localStorage.getItem("token");
//   //const userString = localStorage.getItem("user");
//   //const user = userString ? JSON.parse(userString) : null;

//   return (
//     <div className="section" id="favorites">
//       <div className="favorites">
//         {/* <div className="top__back__link">
//           {/* <Link to="/home" className="icon__house">
//             <LuHouse color="#AA5486" />
//           </Link> */}
//         {/* <Link to="/home" className="top__back__link">
//             <LuHouse color="#AA5486" />
//             <p>На головну</p>
//           </Link>
//       </div> */}
//         <TopBackLink />
//         <h1 className="heading-favorites">Вибране </h1>
//         <p className="under__heading1">{favoriteTotalQuantity} продукти</p>
//         {favoriteItems.length === 0 ? (

//             <p>Поки що немає обраних товарів.</p>

//         ) : (
//           <div className="cards__container">
//             {favoriteItems.map((product: Product) => (
//               <ProductCard key={product.name} {...product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
