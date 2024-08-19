import { createContext, useContext, useReducer } from "react";
import AppReducer, { initialState } from "./AppReducer";




export const getTotalPrice = (basket) => {
  return basket.reduce((amount, item) => {
    return amount + item.price;
  }, 0);
};

const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <GlobalContext.Provider
      value={{ basket: state.basket, user: state.user, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

export const useAuth = () => {
  return useContext(GlobalContext);
};
