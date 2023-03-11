import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { IUser, requestActionTypes } from "../../types/types";
import {
  ENDPOINT_FOR_LOGIN,
  ENDPOINT_FOR_REGISTER,
  REGISTER_USER_SUCCES,
} from "../../utils/constants";
import { getLoginOptions, getRegisterOptions, request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";

export function registerUser(user: IUser) {
  return {
    type: REGISTER_USER_SUCCES,
    payload: user,
  };
}

export function getData() {
  return {
    type: requestActionTypes.GET_DATA_REQUEST,
  };
}

export function getDataFailed() {
  return {
    type: requestActionTypes.GET_DATA_FAILED,
  };
}

type ThunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;

export const registerUserThunk = (
  name: string,
  email: string,
  password: string
): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData); // начало выполенния запроса
    request(ENDPOINT_FOR_REGISTER, getRegisterOptions(name, email, password))
      .then((res) => {
        InfoNotification("Вы успешно зарегистрированы!");
        dispatch(registerUser(res));
        console.log(res);
        setCookie("accessToken", res.accessToken.replace("Bearer", ""));
        setCookie("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken.replace("Bearer", ""));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка! Пропробуйте снова!");
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch(getDataFailed);
        console.log(err);
      });
  };
};

export const authorizeUserThunk = (email: string, password: string): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData); // начало выполенния запроса
    request(ENDPOINT_FOR_LOGIN, getLoginOptions(email, password))
      .then((res) => {
        InfoNotification("Вы успешно авторизованы!");
        // такой же Action Creator как и при регистрации
        dispatch(registerUser(res));
        console.log(res);
        setCookie("accessToken", res.accessToken.replace("Bearer", ""));
        setCookie("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken.replace("Bearer", ""));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка! Пропробуйте снова!");
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch(getDataFailed);
        console.log(err);
      });
  };
};
