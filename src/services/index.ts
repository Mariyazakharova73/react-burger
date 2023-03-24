import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { selectedCardReducer } from "./reducers/selectedCardReducer";
import { orderDetailsReducer } from "./reducers/orderDetailsReducer";
import { ingredientsForBurgerReducer } from "./reducers/ingredientsForBurgerReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { userReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  card: selectedCardReducer,
  order: orderDetailsReducer,
  buy: ingredientsForBurgerReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
