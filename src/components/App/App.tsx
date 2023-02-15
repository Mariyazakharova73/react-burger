import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { URL, BLANK_CARD } from "../../utils/constants.js";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IIngredientDetails, IIdArray } from "../../types/types";
import { IngredientsContext } from "../../contexts/IngredientsContext";

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState(BLANK_CARD);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${URL}/ingredients`);
        const obj = await res.json();
        setIngredients(obj.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const getOrderData = async (data: IIdArray) => {
    try {
      const res = await fetch(`${URL}/orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: data,
        }),
      });
      const obj = await res.json();
      setOrder(obj);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenOrder = () => {
    setIsOpenOrder(true);
    getOrderData(["60d3b41abdacab0026a733cb", "60d3b41abdacab0026a733ce"]);
  };

  const handleOpenIngredient = (data: IIngredientDetails) => {
    setSelectedCard(data);
    setIsOpenIngredient(true);
  };

  const handleClose = () => {
    setIsOpenOrder(false);
    setIsOpenIngredient(false);
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
                  <BurgerIngredients
                    ingredients={ingredients}
                    handleOpenIngredient={handleOpenIngredient}
                  />
                  <BurgerConstructor handleOpenOrder={handleOpenOrder} />
                </main>
              </>
            }
          />
          <Route path="*" element={<p>Страница не найдена</p>} />
        </Routes>
      </IngredientsContext.Provider>
      <Modal isOpen={isOpenIngredient} onClose={handleClose} title="Детали ингредиента">
        <IngredientDetails selectedCard={selectedCard} />
      </Modal>
      <Modal isOpen={isOpenOrder} onClose={handleClose}>
        <OrderDetails order={order} />
      </Modal>
    </div>
  );
};

export default App;
