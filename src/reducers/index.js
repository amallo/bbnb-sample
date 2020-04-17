import { combineReducers } from 'redux';
const initialState = {
  categories: [],
  experiences: [],
  homes: [],
  popular: [],
};
const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LISTINGS':
      return {
        ...state,
        //categories: action.payload.categories,
        experiences: action.payload,
        //homes: action.payload.homes.listings,
        //popular: action.payload.popular.listings,
      };
    default:
      return state;
  }
};
export default combineReducers({
  listings: listingsReducer,
});
