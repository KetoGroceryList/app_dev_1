import SET_FOODS from '../types';
import FOODS from '../../data/dummy-data';

const initialState = {
  foods: FOODS,
  // favFoods: [],
  // savedList: [],
  // categoryFoods: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOODS:
      return {
        ...state,
        foods: action.foods,
      };
  }
  return state;
};
