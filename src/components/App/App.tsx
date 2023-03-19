import React, { useEffect, useState } from "react";
// @ts-ignore
import { ReactNotifications } from "react-notifications-component";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { deleteCard } from "../../services/actions/actions";
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
import "react-notifications-component/dist/theme.css";
import { getUserThunk } from "../../services/actions/userActions";
import { getCookie } from "../../utils/cookie";
import { ProtectedRoute } from "../../HOC/ProtectedRoute";
import OrderPage from "../../pages/OrderPage/OrderPage";

const App: React.FC = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;
  const ingredientsForBurger = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);
  const { isLoggedIn } = useTypedSelector((state) => state.user);

  const arrIdWithBuns = React.useMemo(() => {
    const arrId = ingredientsForBurger.map((item) => {
      return item._id;
    });
    return [...arrId, bun._id, bun._id];
  }, [ingredientsForBurger, bun]);

  useEffect(() => {
    dispatch(getDataIngredients());
    if (getCookie("accessToken")) {
      dispatch(getUserThunk()); // загружаем пользователя
    }
  }, [isLoggedIn]);

  const handleOpenOrder = () => {
    if (isLoggedIn) {
      dispatch(getDataOrder(arrIdWithBuns));
      setIsOpenOrder(true);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    navigate(-1);
    dispatch(deleteCard());
  };

  const handleOrderModalClose = () => {
    setIsOpenOrder(false);
  };

  return (
    <div className={styles.page}>
      <ReactNotifications />
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<MainPage handleOpenOrder={handleOpenOrder} />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <FogotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients/:ingredientId"
          element={
            <IngredientDetailsPage>
              <IngredientDetails />
            </IngredientDetailsPage>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {isOpenOrder && (
        <Modal onClose={handleOrderModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
