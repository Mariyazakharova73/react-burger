import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import cn from "classnames";
import { IBurgerConstructorProps } from "../../types/types";
import uuid from "react-uuid";
import { IngredientsContext } from "../../contexts/IngredientsContext";

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({ handleOpenOrder }) => {
  const ingredients = React.useContext(IngredientsContext);

  const buns = React.useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);

  const bun = buns[0];

  const ingredientsWithoutBuns = React.useMemo(() => {
    return ingredients.filter((item) => item.type !== "bun");
  }, [ingredients]);

  const calculateThePrice = () => {
    const priceOfFillings = ingredientsWithoutBuns.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const priceOfBuns = bun.price * 2;
    return priceOfFillings + priceOfBuns;
  };

  return bun ? (
    <section className={cn("pl-4 pt-25", styles.wrapper)}>
      <ConstructorElement
        extraClass={cn("ml-6 mr-2", styles.element)}
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />

      <ul className={cn("pr-2", styles.list)}>
        {ingredientsWithoutBuns.map((item) => {
          return (
            <li className={styles.item} key={uuid()}>
              <DragIcon type="primary" />
              <ConstructorElement
                extraClass={styles.element}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>
      <ConstructorElement
        extraClass={cn("ml-6 mr-2", styles.element)}
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
      <div className={cn("mt-10", styles.container)}>
        <p className={cn("text text_type_digits-medium mr-10", styles.sum)}>
          {calculateThePrice()}
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  ) : null;
};

export default BurgerConstructor;
