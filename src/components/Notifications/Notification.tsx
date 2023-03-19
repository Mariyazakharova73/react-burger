// @ts-ignore
import { Store } from "react-notifications-component";
import { InfoContent } from "./InfoContent";
import { ErrorContent } from "./ErrorContent";

export const InfoNotification = (message: string): void => {
  Store.addNotification({
    content: InfoContent,
    message: message,
    type: "info",
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 2000,
    },
  });
};

export const ErrorNotification = (message: string): void => {
  Store.addNotification({
    type: "danger",
    content: ErrorContent,
    message: message,
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 2000,
    },
  });
};