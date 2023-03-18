import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { IUser, requestActionTypes } from "../../types/types";
import {
  ENDPOINT_FOR_LOGIN,
  ENDPOINT_FOR_REGISTER,
  ENDPOINT_FOR_TOKEN,
  ENDPOINT_FOR_USER,
  GET_USER_SUCCESS,
  REGISTER_USER_SUCCES,
} from "../../utils/constants";
import {
  getLoginOptions,
  getRegisterOptions,
  getUserOptions,
  refreshTokenOptions,
  request,
  saveTokens,
  updateUserOptions,
} from "../../utils/request";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";

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

export function registerUser() {
  return {
    type: REGISTER_USER_SUCCES,
  };
}

export function getUser(user: IUser) {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
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
        dispatch(registerUser());
        console.log(res);
        saveTokens(res.refreshToken, res.accessToken);
      })
      .catch((err) => {
        ErrorNotification("Ошибка при регистрации!");
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
        dispatch(registerUser());
        console.log(res);
        saveTokens(res.refreshToken, res.accessToken);
      })
      .catch((err) => {
        ErrorNotification("Ошибка при входе в профиль!");
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch(getDataFailed);
        console.log(err);
      });
  };
};

export const getUserThunk = (): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData); // начало выполенния запроса
    request(ENDPOINT_FOR_USER, getUserOptions())
      .then((res) => {
        InfoNotification("Получены данные профиля!");
        dispatch(getUser(res.user));
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "jwt expired") {
          ErrorNotification("Токен просрочен!");
          dispatch(refreshTokenThunk(getData()));
        } else {
          ErrorNotification("Ошибка при получении данных профиля!");
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch(getDataFailed);
        }
      });
  };
};

export const refreshTokenThunk = (afterRefresh: any): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData); // начало выполенния запроса
    request(ENDPOINT_FOR_TOKEN, refreshTokenOptions())
      .then((res) => {
        InfoNotification("Токен обновлен!");
        saveTokens(res.refreshToken, res.accessToken);
        dispatch(afterRefresh);
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка при обновлении токена!");
        console.log(err);
        dispatch(getDataFailed);
      });
  };
};

export const updatetUserThunk = (): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData); // начало выполенния запроса
    request(ENDPOINT_FOR_USER, updateUserOptions())
      .then((res) => {
        InfoNotification("Данные профиля успешно обновлены!");
        dispatch(getUser(res.user));
      })
      .catch((err) => {
        console.log(err);
        ErrorNotification("Ошибка при обновлении данных профиля!");
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch(getDataFailed);
      });
  };
};
