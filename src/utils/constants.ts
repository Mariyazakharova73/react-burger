export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const BLANK_CARD = {
  name: "",
  fat: 0,
  proteins: 0,
  carbohydrates: 0,
  calories: 0,
  image_large: "",
};

export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const GET_INGREDIENTS = "GET_INGREDIENTS";

export const BUN_BY_DEFAULT = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  count: 2,
};

export const ENDPOINT_FOR_LOGIN = "auth/login";
export const ENDPOINT_FOR_REGISTER = "auth/register";
export const ENDPOINT_FOR_LOGOUT = "auth/logout";
export const ENDPOINT_FOR_USER = "auth/user";
export const ENDPOINT_FOR_TOKEN = "auth/token";
export const ENDPOINT_FOR_UPDATE_TOKEN = "auth/token";
export const ENDPOINT_FOR_FORGOT_PASSWORD = "password-reset";
export const ENDPOINT_FOR_RESET_PASSWORD = "password-reset/reset";
export const REGISTER_USER_SUCCES = "REGISTER_USER_SUCCES";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const REMOVE_USER = "REMOVE_USER";
