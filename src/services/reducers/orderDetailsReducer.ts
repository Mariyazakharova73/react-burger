import { orderActionTypes, IOrder, requestActionTypes } from "../../types/types";
import { IRequestAction, IRequestFailedAction } from "./ingredientsReducer";

export interface IOrderDetailsState {
  order: IOrder;
  feedRequest: boolean;
  feedFailed: boolean;
}

const initialState: IOrderDetailsState = {
  order: {},
  feedRequest: false,
  feedFailed: false,
};

export interface IOrderDetailsSuccessAction {
  type: orderActionTypes.GET_ORDER_DETAILS;
  payload: IOrder;
}

export type IOrderDetailsAction = IOrderDetailsSuccessAction | IRequestAction | IRequestFailedAction;

export const orderDetailsReducer = (state = initialState, action: IOrderDetailsAction) => {
  switch (action.type) {
    case orderActionTypes.GET_ORDER_DETAILS:
      return { ...state, order: action.payload };
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
