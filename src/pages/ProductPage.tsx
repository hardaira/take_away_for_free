import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import "./ProductPage.scss";
import { ProductCard } from "../components/ProductCard/ProductCard";

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    console.log("RAW localStorage:", stored);

    const products = stored ? JSON.parse(stored) : [];
    console.log("Parsed products:", products);

    console.log("URL productId:", productId);
    setProducts(products);

    const found = products.find((p: any) => p.id === +productId);

    console.log("FOUND PRODUCT:", found);

    setProduct(found);
  }, [productId]);

  if (!product) return <p>Product not found</p>;

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

  const isInFavorites = favorites.some((p: any) => p.id === product.id);

  const recommended = products.filter(
  (p: any) =>
    p.id !== product.id && // exclude current product
    p.city === product.city &&
    p.category === product.category
);

  return (
    <div className="section">
      <div className="container pp_container">
        <div className="image_and_text">
          <div className="image_and_button">
            <img src={`./${product.image}`} alt="photo" />
            <p>check</p>

            {isInFavorites ? (
              <button
                //className="icon__heart selected"
                //className="pp_heart fav"
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
                //className="icon__heart"
                //className="pp_heart"
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

          <div className="pp_info">
            <div className="title_and_city">
              <p>{product.title}</p>
              <p>{product.city}</p>
            </div>
            <p>{product.category}</p>
            <p>{product.description}</p>
          </div>
        </div>

        <div classname="slider">
          <h3>Схожі продукти з цього міста</h3>

          <div className="recommended-grid">
            {recommended.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
