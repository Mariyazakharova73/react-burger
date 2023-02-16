import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { request, getOrderOptions } from "../../utils/ulils";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IIngredientDetails, IIdArray } from "../../types/types";
import { IngredientsContext } from "../../contexts/IngredientsContext";
import { useDispatch } from "react-redux";
import { getCard, deleteCard, getOrderDetails } from "../../services/actions/actions";

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getIngredients = () => request("ingredients");
    getIngredients()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getOrderData = (data: IIdArray) => {
    request("orders", getOrderOptions(data))
      .then((res) => {
        dispatch(getOrderDetails(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenOrder = () => {
    setIsOpenOrder(true);
    getOrderData(["60d3b41abdacab0026a733cb", "60d3b41abdacab0026a733ce"]);
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
      <IngredientsContext.Provider value={ingredients}>
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
      </IngredientsContext.Provider>
      {isOpenIngredient && (
        <Modal onClose={handleClose} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
      {isOpenOrder && (
        <Modal onClose={handleClose}>
          <OrderDetails/>
        </Modal>
      )}
    </div>
  );
};

export default App;
