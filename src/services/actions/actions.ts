import {
  cardActionTypes,
  IIngredientDetails,
  orderActionTypes,
  IOrder,
  IIngredient,
} from "../../types/types";
import { GET_INGREDIENTS_FOR_BURGER } from "../../utils/constants";

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
