// import React from 'react';
// export const PostsPage: React.FC = () => (
//   <div className="section">
//     <div className="container">
//       <h1>У вас немає оголошень</h1>
//     </div>
//   </div>
// );
import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard/ProductCard";
//import { ProductCard } from "../ProductCard/ProductCard";
// import "./ProductList.scss";
//import { SlMagnifier } from "react-icons/sl";
//import { useOutletContext } from "react-router-dom";
//import products from "../../features/products";
type Product = {
  id: number;
  title: string;
  city: string;
  category: string;
  description: string;
};

export const PostsPage: React.FC = () => {
  
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  //const selectedCity = localStorage.getItem("activeCity") || "Вся Україна";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(
          "https://team-project-backend-production.up.railway.app/products/myProducts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          }
        );

        const data = await res.json();

        setMyProducts(data.content);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  // const filteredProducts = products
  //     .filter((product) =>
  //       product.title.toLowerCase().includes(query.toLowerCase())
  //     )
  //     .filter((product) => {
  //       if (!selectedCity || selectedCity === "Вся Україна") return true;
  //       return product.city === selectedCity;
  //     });

const handleRemovePost = async (productId: number) => {
  // setSuccess("");
  //setError("");

  if (!user) {
    console.log("Ви повинні увійти в систему");
    return;
  }

  try {
    //setLoading(true);
    console.log("DELETE ID:", productId);
    console.log("TYPE:", typeof productId);

    const deletedProductId = productId;

    const res = await fetch(
      `https://team-project-backend-production.up.railway.app/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const data = await res.json();
    // console.log(data);

    // if (!res.ok) {
    //   throw new Error(data.message || "Не вдалося видалити товар");
    // }

    console.log("Товар успішно видалено");
    //setSuccess("Товар успішно видалено");

    //const prevProducts = myProducts;

    setMyProducts((myProducts) =>
      myProducts.filter((p) => p.id !== deletedProductId)
    );
  } catch (err: any) {
    console.error(err);
    //setMyProducts(prevProducts);
    //setError(err.message || "Сервер не відповідає");
  } finally {
    //setLoading(false);
    console.log("Товар успішно видалено");
  }
};

  return (
    <div className="cards__container">
      {myProducts.map((product) => (
        <div className="one__card" key={product.id}>
          <ProductCard
            {...product}
            showFullDetails={true}
            inProfile={true}
            onDelete={handleRemovePost}
          />
        </div>
      ))}
    </div>
  );
};
export default PostsPage;