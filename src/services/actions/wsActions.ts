import { wsActionTypes } from "../../types/wsTypes";
import { ACCESSTOKEN } from "../../utils/constants";

export function getAllOrders() {
  return { type: wsActionTypes.WS_CONNECTION_START, payload: "/all" };
}

export function getUserOrders() {
  return { type: wsActionTypes.WS_CONNECTION_START, payload: `?token=${ACCESSTOKEN}` };
}

export function closeTheConnection() {
  return { type: wsActionTypes.WS_CONNECTION_CLOSED };
}
