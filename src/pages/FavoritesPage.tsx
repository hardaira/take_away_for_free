
import React, { useEffect, useState } from "react";
import TopBackLink from "../components/TopBackLink/TopBackLink";
import { ProductCard } from "../components/ProductCard/ProductCard";
import "./FavoritesPage.scss";


// --- TYPE (adjust if needed)
type Product = {
  id: string;
  name: string;
  title?: string;
  image?: string;
};

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // --- GET USER
  // const userString = localStorage.getItem("user");
  // const user = userString ? JSON.parse(userString) : null;

  // --- HELPERS
  // const getFavorites = (userId: string): Product[] => {
  //   const data = localStorage.getItem(`favorites_${userId}`);
  //   return data ? JSON.parse(data) : [];
  // };

  // // --- LOAD FAVORITES
  // useEffect(() => {
  //   if (user) {
  //     setFavorites(getFavorites(user.id));
  //   }
  // }, [user]);

  // // --- OPTIONAL: REMOVE FROM FAVORITES



  // useEffect(() => {
  //   const userString = localStorage.getItem("user");
  //   const user = userString ? JSON.parse(userString) : null;

  //   if (!user) return;

  //   const key = `favorites_${user.id}`;
  //   const stored = localStorage.getItem(key);
  //   const parsed = stored ? JSON.parse(stored) : [];

  //   setFavorites(parsed);
    
  // }, []);

 

  
  //useEffect(() => {
  //if (!user) return;

  // const key = `favorites_${user.id}`;
  // const stored = localStorage.getItem(key);
  // const parsed = stored ? JSON.parse(stored) : [];

  // setFavorites(parsed);
  // }, [user]);
  
  // const removeFavorite = (productId: string) => {
  //   if (!user) return;

  //   const updated = favorites.filter((item) => item.id !== productId);

  //   localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updated));

  //   setFavorites(updated);
  // };

  // const removeFavorite = (productId: string) => {
  //   const userString = localStorage.getItem("user");
  //   const user = userString ? JSON.parse(userString) : null;

  //   if (!user) return;

  //   const key = `favorites_${user.id}`;

  //   const updated = favorites.filter((item) => item.id !== productId);

  //   localStorage.setItem(key, JSON.stringify(updated));
  //   setFavorites(updated); //  instant UI update
  // };

  useEffect(() => {
    const loadFavorites = () => {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user) return;

      const key = `favorites_${user.id}`;
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : [];

      setFavorites(parsed);
    };

    // initial load
    loadFavorites();

    //  listen for updates
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);
  
  return (
    <div className="section">
      {/* <div className="favorites"> */}
      <div>
        <TopBackLink />

        <h1 className="heading-favorites">Favorites</h1>
        <p className="under__heading1">{favorites.length} items</p>

        {favorites.length === 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;


