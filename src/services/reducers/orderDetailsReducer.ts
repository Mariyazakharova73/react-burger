import { orderActionTypes, IOrder } from "../../types/types";

export interface IOrderDetailsState {
  order: IOrder;
}

const initialState: IOrderDetailsState = {
  order: {},
};

export interface IOrderDetailsAction {
  type: orderActionTypes.GET_ORDER_DETAILS;
  payload: IOrder;
}

export const orderDetailsReducer = (state = initialState, action: IOrderDetailsAction) => {
  switch (action.type) {
    case orderActionTypes.GET_ORDER_DETAILS:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
