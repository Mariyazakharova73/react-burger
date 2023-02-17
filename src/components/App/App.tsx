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
import { useDispatch } from "react-redux";
import { getCard, deleteCard } from "../../services/actions/actions";
import { getDataIngredients, getDataOrder } from "../../services/thunk";

const App: React.FC = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataIngredients());
  }, []);

  const handleOpenOrder = () => {
    setIsOpenOrder(true);
    dispatch(getDataOrder(["60d3b41abdacab0026a733cb", "60d3b41abdacab0026a733ce"]));
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
                <BurgerIngredients handleOpenIngredient={handleOpenIngredient} />
                <BurgerConstructor handleOpenOrder={handleOpenOrder} />
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
