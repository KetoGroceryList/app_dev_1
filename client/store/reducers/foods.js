import {
  SET_FOODS,
  ADD_FAV,
  GET_FAVS,
  DEL_FAV,
  SAVE_LIST,
  GET_LISTS,
  LOAD_LIST,
} from '../types';

const initialState = {
  foods: [],
  favFoods: [],
  groceryLists: [],
  currentList: [],
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
    case SAVE_LIST:
      return {
        ...state,
        groceryLists: action.foods,
      };
    case GET_LISTS:
      return {
        ...state,
        groceryLists: action.foods,
      };
    case LOAD_LIST:
      return {
        ...state,
        currentList: action.id,
      };
  }
  return state;
};
