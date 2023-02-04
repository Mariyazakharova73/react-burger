import React from "react";
import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const App: React.FC = () => {
  return (
    <div className={styles.page}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
              <main className={styles.content}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            </>
          }
        />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Routes>
    </div>
  );
};

export default App;
