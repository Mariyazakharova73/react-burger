import { IIngredient, requestActionTypes } from "../../types/types";
import { GET_INGREDIENTS } from "../../utils/constants";

export interface IIngredientsState {
  ingredients: IIngredient[];
  feedRequest: boolean;
  feedFailed: boolean;
}

const initialState: IIngredientsState = {
  ingredients: [],
  feedRequest: false,
  feedFailed: false,
};

export interface IIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS;
  payload: IIngredient[];
}

export interface IRequestAction {
  type: requestActionTypes.GET_FEED;
}

export interface IRequestFailedAction {
  type: requestActionTypes.GET_FEED_FAILED;
}

export type IIngredientsAction = IIngredientsSuccessAction | IRequestAction | IRequestFailedAction;

export const ingredientsReducer = (state = initialState, action: IIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        // Запрос закончил своё выполнение
        feedRequest: false,
      };
    case requestActionTypes.GET_FEED: {
      return {
        ...state,
        // Запрос начал выполняться
        feedRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        feedFailed: false,
      };
    }
    case requestActionTypes.GET_FEED_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        feedFailed: true,
        // Запрос закончил своё выполнение
        feedRequest: false,
      };
    }
    default:
      return state;
  }
};
