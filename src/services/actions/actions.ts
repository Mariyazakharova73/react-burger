import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {
  cardActionTypes,
  IIngredientDetails,
  orderActionTypes,
  IOrder,
  IIngredient,
} from "../../types/types";
import { GET_INGREDIENTS_FOR_BURGER, GET_INGREDIENTS } from "../../utils/constants";
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

export function getIngredientsForBurger(arr: IIngredient[]) {
  return {
    type: GET_INGREDIENTS_FOR_BURGER,
    payload: arr,
  };
}

export function getIngredients(arr: IIngredient[]) {
  return {
    type: GET_INGREDIENTS,
    payload: arr,
  };
}

type ThunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;

export const getDataIngredients = (): ThunkActionType => {
  return (dispatch) => {
    request("ingredients")
      .then((res) => {
        dispatch(getIngredients(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getDataOrder = (data: string[]): ThunkActionType => {
  return (dispatch) => {
    request("orders", getOrderOptions(data))
      .then((res) => {
        dispatch(getOrderDetails(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
