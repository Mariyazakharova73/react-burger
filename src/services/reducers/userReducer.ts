import { IUser, requestActionTypes } from "../../types/types";
import { GET_USER_SUCCESS, REGISTER_USER_SUCCES } from "../../utils/constants";
import { IRequestAction, IRequestFailedAction } from "./ingredientsReducer";

export interface IUserState {
  user: IUser | null;
  isLoggedIn: boolean;
  dataRequest: boolean;
  dataFailed: boolean;
}

const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  dataRequest: false,
  dataFailed: false,
};

export interface IRegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCES;
  payload: IUser;
}

export interface IGetUserAction {
  type: typeof GET_USER_SUCCESS;
  payload: IUser;
}

export type IRegisterUserAction =
  | IRegisterUserSuccessAction
  | IRequestAction
  | IRequestFailedAction
  | IGetUserAction;

export const userReducer = (state = initialState, action: IRegisterUserAction) => {
  switch (action.type) {
    case requestActionTypes.GET_DATA_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        dataRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        dataFailed: false,
      };
    }
    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, isLoggedIn: true };

    case requestActionTypes.GET_DATA_FAILED: {
      return {
        ...state,
        user: null,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        dataFailed: true,
        // Запрос закончил своё выполнение
        dataRequest: false,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};
