import { FormEvent, Ref } from "react";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  dragId?: string;
  count?: number;
}

export type IIngredientDetails = Omit<
  IIngredient,
  "_id" | "type" | "price" | "image_mobile" | "image" | "__v"
>;

export interface ICardProps {
  item: IIngredient;
}

export interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  selectedCard?: IIngredient | {};
}

export type IModalOverlayProps = Omit<IModalProps, "title" | "selectedCard" | "children">;

export interface IBurgerConstructorProps {
  handleOpenOrder: () => void;
}

export interface ICardListProps {
  arr: IIngredient[];
  title: string;
  ref: Ref<HTMLHeadingElement>;
}

export interface IOrderedIngredientProps {
  item: IIngredient;
  index: number;
  moveCard: any;
}

export type IIdArray = string[];

export interface IOrder {
  name?: string;
  order?: {
    number: number;
  };
  success?: boolean;
}

export interface IOrderDetailsProps {
  order: IOrder;
}

export enum cardActionTypes {
  GET_CARD = "GET_CARD",
  DELETE_CARD = "DELETE_CARD",
}

export enum orderActionTypes {
  GET_ORDER_DETAILS = "GET_ORDER_DETAILS",
}

export enum burgerActionTypes {
  ADD_INGREDIENT = "ADD_INGREDIENT",
  DELETE_INGREDIENT = "DELETE_INGREDIENT",
  UPDATE_LIST = "UPDATE_LIST",
  SET_CURRENT_BUN = "SET_CURRENT_BUN",
}

export enum requestActionTypes {
  GET_DATA_REQUEST = "GET_DATA_REQUEST",
  GET_DATA_FAILED = "GET_DATA_FAILED",
}

export interface IOptions {
  [key: string]: boolean;
}

export interface IFormProps {
  title: string;
  buttonText: string;
  handleSubmit: (evt: FormEvent) => void;
  isValid: boolean;
  errors: any;
  values: any;
  handleChange: any;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export enum updateUserActionTypes {
  UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
}
