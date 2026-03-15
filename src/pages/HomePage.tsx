import React, { useState } from 'react';
import CategorySelect from '../components/CategorySelect/CategorySelect';
import ProductList from '../components/ProductList/ProductList';
import QueryInput from "../components/QueryInput/QueryInput";
// import Form from './FormPage';

//import { setActiveCity, City } from '../../features/filter';
//import { CategoryLinks } from '../components/CategoryLinks/CategoryLinks';
//import SliderHotPrices from '../components/SliderHotPrices/SliderHotPrices';
//import SliderNewBrands from '../components/SliderNewBrands/SliderNewBrands';

//import SliderTop from '../components/SliderTop/SliderTop';

export const HomePage: React.FC = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="section" id="home">
      <div className="home__page__container">
        {/* <h1 id="heading1" className="invisible">
          Home Page
      </h1> */}
        {/* <CategorySelect /> */}
        {/* /<SliderTheNewest /> */}
        {/* <div className="container">
        <ProductList />
      </div> */}
        <CategorySelect />
        <QueryInput query={query} setQuery={setQuery} />
        <div className="container">
          <ProductList query={query} />
        </div>
      
        {/* <Form /> */}
        {/* <SliderTop />
      <SliderNewBrands />
      <CategoryLinks />
      <SliderHotPrices /> */}
      </div>
    </div>
  );
}