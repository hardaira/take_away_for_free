import "./SliderNew.scss";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ProductCard } from "../ProductCard/ProductCard";
//import { useSelector, useDispatch } from "react-redux";
//import { AppDispatch, RootState } from "../../app/store";
//import { selectAllProducts, fetchProducts } from "../../features/products";
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

export const SliderNew: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const products = useSelector(selectAllProducts);
//   const status = useSelector((state: RootState) => state.products.status);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);
    const products = JSON.parse(localStorage.getItem("products")) || [];
    console.log(localStorage.getItem("products"));

  const sortedNewBrands = useMemo(() => {
    return [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
  }, [products]);
  const cardRef = useRef(null);

  const newBrandsSlides = sortedNewBrands.map((product, index) => (
      <div
        key={product.id}
        className="carousel__slide"
        ref={index === 0 ? cardRef : null}
      >
        <ProductCard {...product} />
      </div>
    ));

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  const previousOne = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextOne = () => {
    if (currentIndex + visibleCount < newBrandsSlides.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex + visibleCount >= newBrandsSlides.length;

  return (
    <section>
      <div className="carousel">
        <div className="slider__heading">
          <h2 className="text_above_slider">Нові пропозиції в цьому місті</h2>
          <div className="arrows">
            <button
              className="arrow arrowPrev"
              disabled={isFirst}
              onClick={previousOne}
            >
              <IoIosArrowBack />
            </button>
            <button
              className="arrow arrowNext"
              disabled={isLast}
              onClick={nextOne}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div
          className="slides-row"
          style={{
            transform: `translateX(-${currentIndex * 300}px)`,
          }}
        >
          {newBrandsSlides}
        </div>
      </div>
    </section>
  );
};

export default SliderNew;
