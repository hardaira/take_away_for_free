import React from "react";
import { HiOutlineHeart } from "react-icons/hi";
//import SliderTheNewest from "../components/SliderTheNewest/SliderTheNewest";
export const ProductPage: React.FC = () => {
  const toggleFavorite = (product) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) return;

    const key = `favorites_${user.id}`;
    const stored = localStorage.getItem(key);
    const favorites = stored ? JSON.parse(stored) : [];

    const exists = favorites.find((p) => p.id === product.id);

    let updated;

    if (exists) {
      updated = favorites.filter((p) => p.id !== product.id);
    } else {
      updated = [...favorites, product];
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setFavorites(updated);
    //  notify FavoritesPage to refresh
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  //const isInFavorites = favorites.some((item) => item.id === productId);
  const isInFavorites = favorites.some((p) => p.id === product.id);

  return (
    <div className="section">
      <div className="container">
        <div className="card-image">
          <img
            className="product__card__img"
            src={`./${image}`}
            alt="Product photo"
          />
          {isInFavorites ? (
            <button
              className="icon icon__heart selected"
              onClick={() => toggleFavorite(product)}
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
              onClick={() => toggleFavorite(product)}
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
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ProductCard } from '../components/ProductCard/ProductCard';

// interface Product {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   location_city: string;
//   contact: string;
//   image: string;
// }

// export const ProductPage: React.FC = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   // const [showDetails, setShowDetails] = useState(true);
//   useEffect(() => {
//     const loadProduct = async () => {
//       const response = await fetch('/api/products.json');
//       const products: Product[] = await response.json();

//       const foundProduct = products.find(item => item.id === Number(productId));

//       setProduct(foundProduct || null);

//     };
//     // setShowDetails(true);
//     loadProduct();
//   }, [productId]);

//   return (
//     <div className="section">
//       <div
//         className="container centered"
//         style={{ maxWidth: '300px', margin: '0 auto' }}
//       >
//         {product && (
//           <ProductCard
//             id={product.id}
//             title={product.title}
//             category={product.category}
//             description={product.description}
//             location_city={product.location_city}
//             contact={product.contact}
//             image={product.image}
//             showFullDetails={true}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
