import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import cn from "classnames";
import CardList from "../CardList/CardList";
import { IBurgerIngredientsProps } from "../../types/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({ handleOpenIngredient }) => {
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients);

  const [current, setCurrent] = React.useState("one");
  const refForBun = useRef<HTMLHeadingElement>(null);
  const refForSause = useRef<HTMLHeadingElement>(null);
  const refForMain = useRef<HTMLHeadingElement>(null);

  const filters = React.useMemo(() => {
    const arrWithBuns = ingredients?.filter((item) => item.type === "bun");
    const arrWithSauces = ingredients?.filter((item) => item.type === "sauce");
    const arrWithFillings = ingredients?.filter((item) => item.type === "main");
    return { arrWithBuns, arrWithSauces, arrWithFillings };
  }, [ingredients]);

  useEffect(() => {
    const getRef = (): any => {
      if (current === "one") {
        return refForBun;
      }
      if (current === "two") {
        return refForSause;
      }
      if (current === "three") {
        return refForMain;
      }
    };

    getRef().current.scrollIntoView({
      behavior: "smooth",
    });
  }, [current]);

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={cn("pt-5 pb-4", styles.wrapper)}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.container}>
        <CardList
          ref={refForBun}
          arr={filters.arrWithBuns}
          title="Булки"
          handleOpenIngredient={handleOpenIngredient}
        />
        <CardList
          ref={refForSause}
          arr={filters.arrWithSauces}
          title="Соусы"
          handleOpenIngredient={handleOpenIngredient}
        />
        <CardList
          ref={refForMain}
          arr={filters.arrWithFillings}
          title="Начинки"
          handleOpenIngredient={handleOpenIngredient}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
