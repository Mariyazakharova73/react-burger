import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import cn from "classnames";
import CardList from "../CardList/CardList";
import { IBurgerIngredientsProps } from "../../types/types";

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({ data, handleOpenIngredient }) => {
  const [current, setCurrent] = React.useState("one");

  const arrWithBuns = data?.filter((item) => item.type === "bun");
  const arrWithSauces = data?.filter((item) => item.type === "sauce");
  const arrWithFillings = data?.filter((item) => item.type === "main");

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={cn("pt-5 pb-4", styles.wrapper)}>
        <a className={styles.link} href="#bun">
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a className={styles.link} href="#sauce">
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a className={styles.link} href="#main">
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.container}>
        <CardList
          current={current}
          arr={arrWithBuns}
          title="Булки"
          id={"bun"}
          handleOpenIngredient={handleOpenIngredient}
        />
        <CardList
          current={current}
          arr={arrWithSauces}
          title="Соусы"
          id={"sauce"}
          handleOpenIngredient={handleOpenIngredient}
        />
        <CardList
          current={current}
          arr={arrWithFillings}
          title="Начинки"
          id={"main"}
          handleOpenIngredient={handleOpenIngredient}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
