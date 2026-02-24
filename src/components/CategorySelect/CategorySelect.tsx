import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setActiveCategory, type Category } from '../../features/filterCategory';
// import { setActiveCategory } from '../../features/filterCategory';
// import { useSearchParams, useParams } from 'react-router-dom';
import './CategorySelect.scss';
// import { NavLink } from 'react-router-dom';

export type Category =
  | "Їжа"
  | "Меблі"
  | "Товари для дітей"
  | "Одяг"
  | "Товари для дому";

// const categoryBackgrounds: Record<Category, string> = {
//   // Театр: './category__images/theatre.jpg',
//   // Кіно: './category__images/cinema.jpg',
//   'Їжа та напої': './category__images/food.jpg',
//   Туризм: './category__images/theatre.jpg',
//   'Товари для дітей': './category__images/cinema.jpg',
//   // Танці: './category__images/dancing.jpg',
//   // 'Майстер клас': './category__images/workshop.jpg',
//   // Навчання: './category__images/studies.jpg',
//   // Спорт: './category__images/sport.jpg',
//   // Медитація: './category__images/meditation.jpg',
//   // Змагання: './category__images/competition.jpg',
//   // 'Для всієї сімї': './category__images/family.jpg',
//   // Дегустація: './category__images/degustation.jpg',
//   // 'На свіжому повітрі': './category__images/air.jpg',
//   // Парк: './category__images/park.jpg',
//   // Фестиваль: './category__images/festival.jpg',
// };

const CategorySelect: React.FC = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.filterCategory.activeCategory,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  // const chosenCity = searchParams.get('city');
  // Sync Redux with URL on component mount
  useEffect(() => {
    const current = searchParams.getAll('category') as Category[];
    current.forEach(cat => {
      if (!activeCategory.includes(cat)) {
        dispatch(setActiveCategory(cat));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (
    category: Category,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('category');

    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];

    params.delete('category');
    updated.forEach(c => params.append('category', c));
    setSearchParams(params);

    // Toggle Redux state
    dispatch(setActiveCategory(category));
  };

  return (
    <section>
      <div className="category__select">
        {/* <div className="slider__heading">
          <h2 className="text_above_slider">Обери категорію</h2>
          <NavLink to={`/events/${chosenCity}`} className="info-button">
            Всі категорії
          </NavLink>
        </div> */}

        <div className="filter__category">
          {categories.map(category => (
            <div
              key={category}
              //className="category__option"
              className={`category__option ${activeCategory.includes(category) ? 'category__option__selected' : ''}`}
              onClick={e => handleCategoryChange(category, e)}
              // style={{
              //   backgroundImage: `url(${categoryBackgrounds[category]})`,
              //   backgroundSize: 'cover',
              //   backgroundPosition: 'center',
              // }}
            >
              {category}
              <span
                className={`circle ${activeCategory.includes(category) ? 'circle__selected' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelect;
