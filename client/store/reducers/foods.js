import { SET_FOODS, ADD_FAV } from '../types';

const initialState = {
  foods: [],
  favFoods: [],
  // savedList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOODS:
      return {
        ...state,
        foods: action.foods,
      };
    case ADD_FAV:
      return {
        ...state,
        favFoods: favFoods.concat(action.food),
      };
  }
  return state;
};
