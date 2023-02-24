import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../services";

export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
