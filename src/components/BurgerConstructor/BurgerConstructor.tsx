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

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({ ingredients, handleOpenOrder }) => {
  const name = ingredients[0]?.name;
  const price = ingredients[0]?.price;
  const image = ingredients[0]?.image;

  return (
    <section className={cn("pl-4 pt-25", styles.wrapper)}>
      <ConstructorElement
        extraClass={cn("ml-6 mr-2", styles.element)}
        type="top"
        isLocked={true}
        text={`${name} (верх)`}
        price={price}
        thumbnail={image}
      />

      <ul className={cn("pr-2", styles.list)}>
        {ingredients.map((item) => {
          return (
            <li className={styles.item} key={item._id}>
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
        text={`${name} (низ)`}
        price={price}
        thumbnail={image}
      />
      <div className={cn("mt-10", styles.container)}>
        <p className={cn("text text_type_digits-medium mr-10", styles.sum)}>
          610
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
