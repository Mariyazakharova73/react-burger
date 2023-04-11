import { wsActionTypes, IWSOrder, TWSActions } from "../../types/wsTypes";

interface IWSState {
  wsConnected: boolean;
  orders: IWSOrder[];
  error?: Event;
  success: boolean;
  total: number;
  totalToday: number;
}

const initialState: IWSState = {
  wsConnected: false,
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case wsActionTypes.WS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
      };
    case wsActionTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case wsActionTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case wsActionTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case wsActionTypes.WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: [...state.orders, action.payload],
      };

    default:
      return state;
  }
};
