import { SET_FOODS, ADD_FAV, GET_FAVS, DEL_FAV } from '../types';

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
        favFoods: action.foods,
      };
    case GET_FAVS:
      return {
        ...state,
        favFoods: action.foods,
      };
    case DEL_FAV:
      return {
        ...state,
        favFoods: action.foods,
      };
  }
  return state;
};
