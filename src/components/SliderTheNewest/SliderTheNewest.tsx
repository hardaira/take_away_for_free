import './SliderTheNewest.scss';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ProductCard } from '../ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { selectAllProducts, fetchProducts } from '../../features/products';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SliderTheNewest: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectAllProducts);
  const status = useSelector((state: RootState) => state.products.status);
  const activeCity = useSelector((state: RootState) => state.filterCity.activeCity);
  const activeCategory = useSelector(
  (state: RootState) => state.filterCategory.activeCategory,
);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // const sortedNewBrands = useMemo(() => {
  //   return [...products].sort((a, b) => b.price - a.price).slice(0,3);
  // }, [products]);
  const cardRef = useRef(null);

  const filteredGoods = useMemo(() => {
    return products.filter(product => {
      const matchesCity = product.location_city === activeCity;

      const matchesCategory =
        activeCategory.length === 0 ||
        activeCategory.some(
          cat => cat.toLowerCase() === product.category?.toLowerCase(),
        );

      return matchesCity && matchesCategory;
    });
  }, [products, activeCity, activeCategory]);



  const newBrandsSlides = filteredGoods.map((product, index) => (
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

  return (
    <section>
      <div className="carousel">
        <div className="slider__heading">
          <h2 className="text_above_slider">Популярне {activeCity}</h2>
          <div className="info-button"> Дивитися повністю</div>
          {/* <div className="arrows">
            <button className="arrow arrowPrev" onClick={previousOne}>
              <IoIosArrowBack />
            </button>
            <button className="arrow arrowNext" onClick={nextOne}>
              <IoIosArrowForward />
            </button>

          </div> */}
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

export default SliderTheNewest;
