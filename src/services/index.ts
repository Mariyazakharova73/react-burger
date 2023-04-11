import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { selectedCardReducer } from "./reducers/selectedCardReducer";
import { orderDetailsReducer } from "./reducers/orderDetailsReducer";
import { ingredientsForBurgerReducer } from "./reducers/ingredientsForBurgerReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { userReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";
import { wsReducer } from "./reducers/wsReduser";
import { socketMiddleware } from "../services/middleware";
import { WS_URL } from "../utils/constants";
import { TWSStoreActions, wsActionTypes } from "../types/wsTypes";

export const rootReducer = combineReducers({
  card: selectedCardReducer,
  order: orderDetailsReducer,
  buy: ingredientsForBurgerReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
  ws: wsReducer,
});

const wsActions: TWSStoreActions = {
  wsInit: wsActionTypes.WS_CONNECTION_START,
  wsSendMessage: wsActionTypes.WS_SEND_MESSAGE,
  onOpen: wsActionTypes.WS_CONNECTION_SUCCESS,
  onClose: wsActionTypes.WS_CONNECTION_CLOSED,
  onError: wsActionTypes.WS_CONNECTION_ERROR,
  onMessage: wsActionTypes.WS_GET_MESSAGE,
};

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL, wsActions)))
);

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
