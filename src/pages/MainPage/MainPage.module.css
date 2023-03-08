import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IMainPageProps } from "../../types/types";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "../../components/App/App.module.css";

const MainPage: React.FC<IMainPageProps> = ({ handleOpenIngredient, handleOpenOrder }) => {
  return (
    <main className={styles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients handleOpenIngredient={handleOpenIngredient} />
        <BurgerConstructor handleOpenOrder={handleOpenOrder} />
      </DndProvider>
    </main>
  );
};

export default MainPage;
