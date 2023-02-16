import { Ref } from "react";

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
}

export type IIngredientDetails = Omit<
  IIngredient,
  "_id" | "type" | "price" | "image_mobile" | "image" | "__v"
>;

export interface ICardProps {
  item: IIngredient;
  handleOpenIngredient: (data: IIngredientDetails) => void;
}

export interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  selectedCard?: IIngredient | {};
}

export type IModalOverlayProps = Omit<IModalProps, "title" | "selectedCard" | "children">;

export interface IBurgerIngredientsProps {
  handleOpenIngredient: (data: IIngredientDetails) => void;
}

export interface IBurgerConstructorProps {
  handleOpenOrder: () => void;
}

export interface ICardListProps {
  arr: IIngredient[];
  title: string;
  handleOpenIngredient: (ingredient: IIngredientDetails) => void;
  ref: Ref<HTMLHeadingElement>;
}

export interface IIngredientDetailsProps {
  selectedCard: IIngredientDetails;
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
