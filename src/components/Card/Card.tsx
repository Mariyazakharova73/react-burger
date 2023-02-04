import React from "react";
import { ICardProps } from "../../types/types";
import styles from "./Card.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

const Card: React.FC<ICardProps> = ({ name, price, image }) => {
  return (
    <li className={styles.item}>
      <Counter count={1} size="default" />
      <img src={image} alt="Ингредиент."/>
      <div className={cn("mt-2 text text_type_digits-default", styles.price)}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={cn("mt-2 text text_type_main-default", styles.title)}>{name}</h3>
    </li>
  );
};

export default Card;
