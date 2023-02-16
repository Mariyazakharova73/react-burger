import { IIngredient } from "../../types/types";
import { GET_INGREDIENTS_FOR_BURGER } from "../../utils/constants";

export interface IIngredientsForBurgerState {
  ingredientsForBurger: IIngredient[];
}

const initialState: IIngredientsForBurgerState = {
  ingredientsForBurger: [],
};

export interface IIngredientsForBurgerAction {
  type: typeof GET_INGREDIENTS_FOR_BURGER;
  payload: IIngredient[];
}

export const ingredientsForBurgerReducer = (
  state = initialState,
  action: IIngredientsForBurgerAction
) => {
  switch (action.type) {
    case GET_INGREDIENTS_FOR_BURGER:
      return { ...state, ingredientsForBurger: action.payload };
    default:
      return state;
  }
};
