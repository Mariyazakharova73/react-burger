import React from "react";
import { ICardProps } from "../../types/types";
import styles from "./Card.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

const Card: React.FC<ICardProps> = ({ item, handleOpenIngredient }) => {
  const dataForModal = {
    name: item.name,
    calories: item.calories,
    proteins: item.proteins,
    fat: item.fat,
    carbohydrates: item.carbohydrates,
    image_large: item.image_large,
  };

  const handleClick = () => {
    handleOpenIngredient(dataForModal);
  };

  return (
    <li className={styles.item} onClick={handleClick}>
      <Counter count={1} size="default" />
      <img src={item.image} alt={`${item.name}.`} />
      <div className={cn("mt-2 text text_type_digits-default", styles.price)}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={cn("mt-2 text text_type_main-default", styles.title)}>{item.name}</h3>
    </li>
  );
};

export default Card;
