import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Category =
|"Їжа та напої"
|"Туризм"
|"Товари для дітей";

interface FilterCategoryState {
  activeCategory: Category[];
}

const initialState: FilterCategoryState = {
  activeCategory: [],
};

const filterCategorySlice = createSlice({
  name: "filterCategory",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.activeCategory.includes(category)) {
        state.activeCategory = state.activeCategory.filter(
          (c) => c !== category
        );
      } else {
        state.activeCategory.push(category);
      }
    },
  },
});

export const { setActiveCategory } = filterCategorySlice.actions;
export default filterCategorySlice.reducer;
