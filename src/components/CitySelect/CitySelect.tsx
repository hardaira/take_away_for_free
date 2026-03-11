import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./CitySelect.scss";
import { useSearchParams } from "react-router-dom";

type City = string;

type Props = {
  activeCity: string;
  setActiveCity: (city: string) => void;
};

const cities: City[] = [
  "Вся Україна",
  "Біла Церква",
  "Бровари",
  "Вінниця",
  "Дніпро",
  "Житомир",
  "Запоріжжя",
  "Івано-Франківськ",
  "Кам’янець-Подільський",
  "Київ",
  "Краматорськ",
  "Кривий Ріг",
  "Луцьк",
  "Львів",
  "Миколаїв",
  "Одеса",
  "Полтава",
  "Рівне",
  "Суми",
  "Тернопіль",
  "Ужгород",
  "Харків",
  "Херсон",
  "Хмельницький",
  "Черкаси",
  "Чернівці",
  "Чернігів",
];

const CitySelect: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCity, setActiveCity] = useState("Вся Україна");
  const selectedCity = localStorage.getItem("activeCity") || "Вся Україна";
 
  // const activeCity = localStorage.getItem("activeCity") || "Вся Україна";
  return (
    <div className="city-select">
      <div className="select__box" onClick={() => setIsOpen((prev) => !prev)}>
        <p className="selected__city">{selectedCity}</p>

        {isOpen ? (
          <IoIosArrowUp color="#4a6fa5" />
        ) : (
          <IoIosArrowDown color="#4a6fa5" />
        )}
      </div>

      {isOpen && (
        <div className="cities__list">
          {cities.map((city) => (
            <div
              key={city}
              className={`city__option ${
                activeCity === city ? "selected__option" : ""
              }`}
              onClick={() => {
                setActiveCity(city);
                setIsOpen(false);
                
                setSearchParams({ city });
                localStorage.setItem("activeCity", city);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySelect;

// const CitySelect: React.FC = () => {
//   const dispatch = useDispatch();
//   const activeCity = useSelector(
//     (state: RootState) => state.filterCity.activeCity,
//   );
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Sync Redux with URL on mount
//   useEffect(() => {
//     const cityFromUrl = searchParams.get('city') as City | null;
//     if (cityFromUrl && cities.includes(cityFromUrl)) {
//       dispatch(setActiveCity(cityFromUrl));
//     } else {
//       dispatch(setActiveCity('Вся Україна'));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleSelect = (city: City) => {
//     dispatch(setActiveCity(city));
//     setIsOpen(false);

//     const params = new URLSearchParams(searchParams);
//     if (city === 'Вся Україна') {
//       params.delete('city');
//     } else {
//       params.set('city', city);
//     }

//     setSearchParams(params);
//   };

//   return (
//     <div className="city-select">
//       <div className="select__box" onClick={() => setIsOpen(prev => !prev)}>
//         <p className="selected__city">{activeCity}</p>
//         {isOpen ? (
//           <IoIosArrowUp color="rgb(16, 91, 16)" />
//         ) : (
//           <IoIosArrowDown color="rgb(16, 91, 16)" />
//         )}
//       </div>

//       {isOpen && (
//         <div className="sort__filter">
//           {cities.map(city => (
//             <div
//               key={city}
//               className={`city__option ${activeCity === city ? 'selected__option' : ''}`}
//               onClick={() => handleSelect(city)}
//             >
//               {city}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

//export default CitySelect;
