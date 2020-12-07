import axios from 'axios';

const result = axios.get('http://localhost:5000/api/foods/');
const foods = result.data;

const initialState = {
  foods: foods,
  //categoryFoods: foods.filter((food) => food.type === 'meat'),
  favouriteFoods: [],
};

const foodsReducer = (state = initialState, action) => {
  return state;
};

export default foodsReducer;
