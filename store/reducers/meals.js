import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS :
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter(meal => {
        const filter = (appliedFilters.glutenFree  && !meal.isGlutenFree) || (appliedFilters.lactoseFree && !meal.isLactoseFree) || (appliedFilters.vegetarian && !meal.isVegetarian) || (appliedFilters.vegan && !meal.isVegan)
        if (filter){
          return false
        } else {
          return true
        }
      })
      return {...state, filteredMeals : filteredMeals}
    default:
      return state;
  }
};

export default mealsReducer;
