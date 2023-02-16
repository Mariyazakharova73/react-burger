import { cardActionTypes, IIngredientDetails } from "../../types/types";
import { BLANK_CARD } from "../../utils/constants";

export interface ISelectedCardState {
  selectedCard: IIngredientDetails;
}

export interface ISelectedCardShowAction {
  type: cardActionTypes.GET_CARD;
  payload: IIngredientDetails;
}

export interface ISelectedCardDeleteAction {
  type: cardActionTypes.DELETE_CARD;
}

export type ISelectedCardAction = ISelectedCardShowAction | ISelectedCardDeleteAction;

const initialState: ISelectedCardState = {
  selectedCard: BLANK_CARD,
};

export const selectedCardReducer = (state = initialState, action: ISelectedCardAction) => {
  switch (action.type) {
    case cardActionTypes.GET_CARD:
      return { ...state, selectedCard: action.payload };
    case cardActionTypes.DELETE_CARD:
      return { ...state, selectedCard: BLANK_CARD };
    default:
      return state;
  }
};
