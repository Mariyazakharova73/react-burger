import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {
  cardActionTypes,
  IIngredientDetails,
  orderActionTypes,
  IOrder,
  IIngredient,
  burgerActionTypes,
  requestActionTypes,
} from "../../types/types";
import { GET_INGREDIENTS } from "../../utils/constants";
import { getOrderOptions, request } from "../../utils/ulils";

export function getCard(selectedCard: IIngredientDetails) {
  return {
    type: cardActionTypes.GET_CARD,
    payload: selectedCard,
  };
}

export function deleteCard() {
  return {
    type: cardActionTypes.DELETE_CARD,
  };
}

export function getOrderDetails(order: IOrder) {
  return {
    type: orderActionTypes.GET_ORDER_DETAILS,
    payload: order,
  };
}

export function addIngredient(obj: IIngredient) {
  return {
    type: burgerActionTypes.ADD_INGREDIENT,
    payload: obj,
  };
}

export function deleteIngredient(id?: string) {
  return {
    type: burgerActionTypes.DELETE_INGREDIENT,
    payload: id,
  };
}

export function updateIngredients(arr: IIngredient[]) {
  return {
    type: burgerActionTypes.UPDATE_LIST,
    payload: arr,
  };
}

export function getIngredients(arr: IIngredient[]) {
  return {
    type: GET_INGREDIENTS,
    payload: arr,
  };
}

export function setCurrentBun(obj: IIngredient) {
  return {
    type: burgerActionTypes.SET_CURRENT_BUN,
    payload: obj,
  };
}

export function getFeed() {
  return {
    type: requestActionTypes.GET_FEED,
  };
}

export function getFeedFailed() {
  return {
    type: requestActionTypes.GET_FEED_FAILED,
  };
}

type ThunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;

export const getDataIngredients = (): ThunkActionType => {
  return (dispatch) => {
    dispatch(getFeed); // начало выполенния запроса
    request("ingredients")
      .then((res) => {
        dispatch(getIngredients(res.data));
      })
      .catch((err) => {
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch(getFeedFailed);
        console.log(err);
      });
  };
};

export const getDataOrder = (data: string[]): ThunkActionType => {
  return (dispatch) => {
    dispatch(getFeed); // начало выполенния запроса
    request("orders", getOrderOptions(data))
      .then((res) => {
        dispatch(getOrderDetails(res));
      })
      .catch((err) => {
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch(getFeedFailed);
        console.log(err);
      });
  };
};
