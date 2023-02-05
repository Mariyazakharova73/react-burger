import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { data, shortArray } from "../../utils/data";
import cn from "classnames";

const BurgerConstructor = () => {
  const image = data[0].image;

  return (
    <section className={cn("pl-4 pt-25", styles.wrapper)}>
      <ConstructorElement
        extraClass={cn("ml-6 mr-2", styles.element)}
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={image}
      />

      <ul className={cn("pr-2", styles.list)}>
        {shortArray.map((item) => {
          return (
            <li className={styles.item}>
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
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={image}
      />
      <div className={cn("mt-10", styles.container)}>
        <p className={cn("text text_type_digits-medium mr-10", styles.sum)}>
          610
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
