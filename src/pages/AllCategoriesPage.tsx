// import React from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../components/ProductList/ProductList';
import { TopBackLink } from '../components/TopBackLink/TopBackLink';
//import { Filter } from '../components/Filter/Filter';
//import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

// import { LuHouse } from 'react-icons/lu';
// import { Link } from 'react-router-dom';
//import { Pagination } from '../components/Pagination/Pagination';
//import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const AllCategoriesPage: React.FC = () => {
  // const dispatch = useDispatch();
  const activeCity = useSelector(
    (state: RootState) => state.filterCity.activeCity,
  );
  const navigate = useNavigate();

  // const products = useSelector((state: RootState) => state.products.items);

  // const phones = products.filter(product => product.category === 'phones');

  // const phonesModels = phones.length;
  useEffect(() => {
    if (activeCity) {
      const encodedCity = encodeURIComponent(activeCity);
      navigate(`/events/${encodedCity}`);
    }
  }, [activeCity, navigate]);

  return (
    <div className="section" id="phones">
      <TopBackLink />
      <div className="main__container">
        <h1 id="heading1">Вас вітає {activeCity}</h1>

        {/* <p className="under__heading1">{phonesModels} models</p>
        <div className="select__section">
          <div className="sort__select">
            <label htmlFor="filter-select">Sort by</label>
            <Filter />
          </div>
          <div className="sort__select">
            <label htmlFor="pagination-select">Items on page</label>
            <Pagination />
          </div>
        </div> */}
        <div className="container">
          <ProductList  />
        </div>

        {/* <Outlet /> */}
      </div>
    </div>
  );
};
