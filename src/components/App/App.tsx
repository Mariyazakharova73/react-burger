import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IIngredientDetails } from "../../types/types";
import { getCard, deleteCard } from "../../services/actions/actions";
import { getDataIngredients, getDataOrder } from "../../services/actions/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const App: React.FC = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const dispatch = useAppDispatch();
  const ingredientsForBurger = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);

  const arrIdWithBuns = React.useMemo(() => {
    const arrId = ingredientsForBurger.map((item) => {
      return item._id;
    });
    return [...arrId, bun._id, bun._id];
  }, [ingredientsForBurger, bun]);

  useEffect(() => {
    dispatch(getDataIngredients());
  }, []);

  const handleOpenOrder = () => {
    setIsOpenOrder(true);
    dispatch(getDataOrder(arrIdWithBuns));
  };

  const handleOpenIngredient = (data: IIngredientDetails) => {
    dispatch(getCard(data));
    setIsOpenIngredient(true);
  };

  const handleClose = () => {
    setIsOpenOrder(false);
    setIsOpenIngredient(false);
    dispatch(deleteCard());
  };

  return (
    <div className={styles.page}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
              <main className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients handleOpenIngredient={handleOpenIngredient} />
                  <BurgerConstructor handleOpenOrder={handleOpenOrder} />
                </DndProvider>
              </main>
            </>
          }
        />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Routes>

      {isOpenIngredient && (
        <Modal onClose={handleClose} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
      {isOpenOrder && (
        <Modal onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
