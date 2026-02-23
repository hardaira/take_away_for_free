/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type City =
  | 'Вся Україна'
  | 'Біла Церква'
  | 'Бровари'
  | 'Вінниця'
  | 'Дніпро'
  | 'Житомир'
  | 'Запоріжжя'
  | 'Івано-Франківськ'
  | 'Кам’янець-Подільський'
  | 'Київ'
  | 'Краматорськ'
  | 'Кривий Ріг'
  | 'Луцьк'
  | 'Львів'
  | 'Миколаїв'
  | 'Одеса'
  | 'Полтава'
  | 'Рівне'
  | 'Суми'
  | 'Тернопіль'
  | 'Ужгород'
  | 'Харків'
  | 'Херсон'
  | 'Хмельницький'
  | 'Черкаси'
  | 'Чернівці'
  | 'Чернігів';

const initialState = {
  activeCity: 'Вся Україна' as City,
};

export const filterCitySlice = createSlice({
  name: 'filterCity',
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<City>) => {
      state.activeCity = action.payload;
    },
  },
});

export const { setActiveCity } = filterCitySlice.actions;
export default filterCitySlice.reducer;
