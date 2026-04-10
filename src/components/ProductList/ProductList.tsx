// import React, { useEffect, useMemo, useState } from "react";
// import { ProductCard } from "../ProductCard/ProductCard";
// import { Pagination } from "../Pagination/Pagination";
// import "./ProductList.scss";
// import { useSearchParams } from "react-router-dom";
// import { Loader } from "../Loader/Loader";

// type Product = {
//   id: number;
//   title: string;
//   city: string;
//   category: string;
//   description: string;
// };

// export const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const selectedCity = localStorage.getItem("activeCity") || "Вся Україна";

//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("query") || "";
//   const activeCategories = searchParams.getAll("category");
//   //const cardsPerPage = 4;
//   //const [currentPage, setCurrentPage] = useState(1);

//   // 📦 Load products
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await fetch(
//           "https://team-project-backend-production.up.railway.app/products"
//         );

//         const data = await res.json();
//         setProducts(data.content);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   const filteredProducts = products;
//         .filter((product) =>
//           product.title.toLowerCase().includes(query.toLowerCase())
//         )
//         .filter((product) => {
//           if (!selectedCity || selectedCity === "Вся Україна") return true;
//           return product.city === selectedCity;
//         })
//         .filter((product) => {
//       if (activeCategories.length === 0) return true;
//       return activeCategories.includes(product.category);
//         });
    

//   // ✅ Reset pagination when filters change
//   useEffect(() => {
//     setVisibleProducts(filteredProducts.slice(0, 4));
//   }, [filteredProducts]);

//   // ⏳ Loader
//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
//         <Loader />
//       </div>
//     );
//   }

//   // 🚫 No results
//   if (filteredProducts.length === 0) {
//     return <p>За вашим запитом не знайдено жодних пропозицій</p>;
//   }

//   // ✅ Render
//   return (
//     <>
//       <div className="cards__container">
//         {visibleProducts.map((product) => (
//           <div className="one__card" key={product.id}>
//             <ProductCard {...product} />
//           </div>
//         ))}
//       </div>

//       <Pagination
//         products={filteredProducts}
//         cardsPerPage={4}
//         //onPageChange={setVisibleProducts}
//       />
//     </>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Pagination } from "../Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import "./ProductList.scss";
import { SlMagnifier } from "react-icons/sl";
import { useOutletContext } from "react-router-dom";
//import { useSearchParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
//import { FiLoader } from "react-icons/fi";

//import products from "../../features/products";
type Product = {
  id: number;
  title: string;
  city: string;
  category: string;
  description: string;
};

export const ProductList: React.FC = () => {
  //const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const selectedCity = localStorage.getItem("activeCity") || "Вся Україна";
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const activeCategories = searchParams.getAll("category");
 const currentPage = Number(searchParams.get("page") || "1");
  const cardsPerPage = 4;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("https://team-project-backend-production.up.railway.app/products");

        const data = await res.json();
        console.log("API:", data);
        setProducts(data.content);
        localStorage.setItem("products", JSON.stringify(data.content));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Loader />
      </div>
    );
  }

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter((product) => {
      if (!selectedCity || selectedCity === "Вся Україна") return true;
      return product.city === selectedCity;
    })
    .filter((product) => {
      if (activeCategories.length === 0) return true;
      return activeCategories.includes(product.category);
    });

  // useEffect(() => {
  //   setVisibleProducts(filteredProducts.slice(0, 4));
  // }, [filteredProducts]);

  // useEffect(() => {
  //   setSearchParams((prev: Number) => {
  //     const params = new URLSearchParams(prev);
  //     params.set("page", "1");
  //     return params;
  //   });
  // }, [query, selectedCity, activeCategories.join(",")]);

  return filteredProducts.length !== 0 ? (
   <>
      <div className="cards__container">
        {filteredProducts.slice(startIndex, endIndex).map((product) => (
          <div className="one__card" key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      
    <Pagination
  products={filteredProducts} />
</>
  ) : (
    <p> За вашим запитом не знайдено жодних пропозицій</p>
  )
  

}

export default ProductList;

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

// export const ProductList: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState([]);
//   const selectedCity = localStorage.getItem("activeCity") || "Вся Україна";
//   // const { products, setProducts, activeCity } = useOutletContext<AppContext>();

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await fetch(
//           "https://team-project-backend-production.up.railway.app/products"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadProducts();
//   }, []); // <- empty array, runs once

//   if (!products.length) {
//     return <p>No products found.</p>;
//   }

//   const filteredProducts = products
//     .filter((product) =>
//       product.title.toLowerCase().includes(query.toLowerCase())
//     )
//     .filter((product) => {
//       if (!selectedCity || selectedCity === "Вся Україна") return true;
//       return product.city === selectedCity;
//     });

//   return (
//     <>
//       {/* <div className="list__heading">
//         <p className="list__top">
//           {activeCity || "Вся Україна"}, обирай найкращі пропозиції!
//         </p>

//         <div className="input-wrapper">
//           <SlMagnifier className="input-icon" />

//           <input
//             type="text"
//             className="input-style query"
//             placeholder="Шукай за назвою"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </div>
//       </div> */}

//       <div className="cards__container">
//         {filteredProducts.map((product) => (
//           <div className="one__card" key={product.id}>
//             <ProductCard {...product} />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ProductList;
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

//export default ProductList;
