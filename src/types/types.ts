export interface IData {
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
  IData,
  "_id" | "type" | "price" | "image_mobile" | "image" | "__v"
>;

export interface ICardProps {
  item: IData;
  handleOpenIngredient: (data: IIngredientDetails) => void;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  selectedCard?: IData | {};
}

export type IModalOverlayProps = Omit<IModalProps, "title" | "selectedCard">;

export interface IBurgerIngredientsProps {
  data: IData[];
  handleOpenIngredient: (data: IIngredientDetails) => void;
}

export interface IBurgerConstructorProps {
  data: IData[];
  handleOpenOrder: () => void;
}

export interface ICardListProps {
  current: string;
  arr: IData[];
  title: string;
  id: string;
  handleOpenIngredient: (data: IIngredientDetails) => void;
}

export interface IIngredientDetailsProps {
  selectedCard: IIngredientDetails;
}
