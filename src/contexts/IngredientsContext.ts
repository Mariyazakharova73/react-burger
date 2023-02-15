import React from "react";
import { IIngredient } from "../types/types";

export const IngredientsContext = React.createContext<IIngredient[]>([]);
