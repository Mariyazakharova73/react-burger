import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IIngredientDetails } from "../../types/types";
import { getCard, deleteCard } from "../../services/actions/actions";
import { getDataIngredients, getDataOrder } from "../../services/actions/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainPage from "../../pages/MainPage/MainPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import FogotPasswordPage from "../../pages/FogotPasswordPage/FogotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

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
      <AppHeader />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              handleOpenOrder={handleOpenOrder}
              handleOpenIngredient={handleOpenIngredient}
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<FogotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFoundPage/>} />
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
