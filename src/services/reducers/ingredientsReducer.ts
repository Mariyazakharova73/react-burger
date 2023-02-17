import { IIngredient } from "../../types/types";
import { GET_INGREDIENTS } from "../../utils/constants";

export interface IIngredientsState {
  ingredients: IIngredient[];
}

const initialState: IIngredientsState = {
  ingredients: [],
};

export interface IIngredientsAction {
  type: typeof GET_INGREDIENTS;
  payload: IIngredient[];
}

export const ingredientsReducer = (state = initialState, action: IIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    default:
      return state;
  }
};
