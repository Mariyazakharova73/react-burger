import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch } from "../../hooks/useAppDispatch";
import { TWSStoreActions } from "../../types/wsTypes";
import { WS_ORDER_URL, WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { RootState } from "../index";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsInitOrders, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(WS_URL);
      } else if (type === wsInitOrders) {
        const accessToken = getCookie("accessToken")?.replace('Bearer ','');
        socket = new WebSocket(`${WS_ORDER_URL}?token=${accessToken}`);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        // функция, которая вызывается при ошибке соединени
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({
            type: onMessage,
            payload: JSON.parse(data),
          });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
        if (type === wsSendMessage) {
          const message = action.payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
