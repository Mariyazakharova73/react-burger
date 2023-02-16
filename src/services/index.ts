import { compose, createStore } from "redux";
import { combineReducers } from "redux";
import { selectedCardReducer } from "./reducers/selectedCardReducer";
import { orderDetailsReducer } from "./reducers/orderDetailsReducer";
import { ingredientsForBurgerReducer } from "./reducers/ingredientsForBurgerReducer";

export const rootReducer = combineReducers({
  card: selectedCardReducer,
  order: orderDetailsReducer,
  buy: ingredientsForBurgerReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers();

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;
