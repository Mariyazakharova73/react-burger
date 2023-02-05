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
import { IIngredientDetails } from "../../types/types";

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState(BLANK_CARD);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(URL);
        const obj = await res.json();
        setData(obj.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const handleOpenOrder = () => {
    setIsOpenOrder(true);
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
              <main className={styles.content}>
                <BurgerIngredients data={data} handleOpenIngredient={handleOpenIngredient} />
                <BurgerConstructor data={data} handleOpenOrder={handleOpenOrder} />
              </main>
            </>
          }
        />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Routes>
      <Modal isOpen={isOpenIngredient} onClose={handleClose} title="Детали ингредиента">
        <IngredientDetails selectedCard={selectedCard} />
      </Modal>
      <Modal isOpen={isOpenOrder} onClose={handleClose}>
        <OrderDetails />
      </Modal>
    </div>
  );
};

export default App;
