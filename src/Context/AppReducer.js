export const initialState = {
  basket: [],
  user: null,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_ITEM":
      let newBasket = state.basket.filter(
        (product) => product.id !== action.id
      );
      return {
        ...state,
        basket: newBasket,
      };
    case "EMTY_CART":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};

export default AppReducer;
