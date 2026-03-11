import React, { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductList.scss";
import { SlMagnifier } from "react-icons/sl";
import { useOutletContext } from "react-router-dom";
//import products from "../../features/products";

// type Product = {
//   id: number;
//   title: string;
//   city: string;
//   category: string;
//   description: string;
// };

// type AppContext = {
//   products: Product[];
//   setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
//   activeCity: string;
// };

export const ProductList: React.FC = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
const selectedCity = localStorage.getItem("activeCity") || "Вся Україна";
  // const { products, setProducts, activeCity } = useOutletContext<AppContext>();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(
          "https://team-project-backend-production.up.railway.app/products"
        );

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, [products]);

  if (!products.length) {
    return <p>No products found.</p>;
  }

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter((product) => {
      if (!selectedCity || selectedCity === "Вся Україна") return true;
      return product.city === selectedCity;
    });

  return (
    <>
      {/* <div className="list__heading">
        <p className="list__top">
          {activeCity || "Вся Україна"}, обирай найкращі пропозиції!
        </p>

        <div className="input-wrapper">
          <SlMagnifier className="input-icon" />

          <input
            type="text"
            className="input-style query"
            placeholder="Шукай за назвою"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div> */}

      <div className="cards__container">
        {filteredProducts.map((product) => (
          <div className="one__card" key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { type AppDispatch, type RootState } from '../../app/store';
// import { fetchProducts, selectAllProducts } from '../../features/products';
// import { ProductCard } from '../ProductCard/ProductCard';
// import './ProductList.scss';
// import { SlMagnifier } from 'react-icons/sl';

// export const ProductList: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const products = useSelector(selectAllProducts);
//   const activeCity = useSelector(
//     (state: RootState) => state.filterCity.activeCity,
//   );
//   const activeCategory = useSelector(
//     (state: RootState) => state.filterCategory.activeCategory,
//   );
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (!products || products.length === 0) {
//     return <p>No products found.</p>;
//   }

//   return (
//     <>
//       <div className="list__heading">
//         <p className="list__top">{activeCity}, обирай найкращі пропозиції!</p>
//         <div className="input-wrapper">
//           <SlMagnifier className="input-icon" />
//           <input
//             type="text"
//             className="input-style query"
//             placeholder="Шукай за назвою"
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="cards__container">
//         {products
//           .filter(product =>
//             product.title.toLowerCase().includes(query.toLowerCase()),
//           )
//           .filter(product => {
//             const isAllUkraine = activeCity === 'Вся Україна' || !activeCity;
//             const matchesCity =
//               isAllUkraine || product.location_city === activeCity;

//             const matchesCategory =
//               activeCategory.length === 0 ||
//               activeCategory.includes(product.category);

//             return matchesCity && matchesCategory;
//           })
//           .map(product => (
//             <div className="one__card" key={product.id}>
//               <ProductCard {...product} />
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default ProductList;
