import { IIdArray, IIngredient, IOrder } from "./../types/types";
import { AnyAction, Dispatch } from "redux";
import { getOrderOptions, request } from "../utils/ulils";
import { getIngredients, getOrderDetails } from "./actions/actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./index";
import { resolve } from "node:path/win32";

// type ThunkType = ThunkAction<Promise<void>, RootState, unknown, AnyAction>;

export const getDataIngredients: any = () => {
  return (dispatch: Dispatch<{ type: string; payload: IIngredient[] }>) => {
    request("ingredients")
      .then((res) => {
        dispatch(getIngredients(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getDataOrder: any = (data: IIdArray) => {
  return (dispatch: Dispatch<{ type: string; payload: IOrder }>) => {
    request("orders", getOrderOptions(data))
      .then((res) => {
        dispatch(getOrderDetails(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
