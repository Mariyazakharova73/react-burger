import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch } from "../../hooks/useAppDispatch";
import { TWSStoreActions } from "../../types/wsTypes";
import { RootState } from "../index";

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
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
          // const parsedData = JSON.parse(data);
          // const { success, ...restParsedData } = parsedData;
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
