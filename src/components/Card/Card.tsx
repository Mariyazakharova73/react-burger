import React, { useMemo } from "react";
import { ICardProps } from "../../types/types";
import styles from "./Card.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { useDrag } from "react-dnd";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Card: React.FC<ICardProps> = ({ item, handleOpenIngredient }) => {
  const { name, calories, proteins, fat, carbohydrates, image_large } = item;

  const ingredientsForBurger = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);

  const count = useMemo(() => {
    return ingredientsForBurger.filter((ingredient) => {
      return ingredient._id === item._id;
    }).length;
  }, [ingredientsForBurger, item._id]);

  const dataForModal = {
    name: name,
    calories: calories,
    proteins: proteins,
    fat: fat,
    carbohydrates: carbohydrates,
    image_large: image_large,
  };

  const handleClick = () => {
    handleOpenIngredient(dataForModal);
  };

  // opacity - возвращается из функции collect
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    // данные, которые dnd будет передавать в качестве аргумента во внутренние колбэки
    item: { ...item },
    // Метод collect агрегириует информацию, полученную из мониторов и возвращает ее в объекте, первым аргументом нашего хукка
    collect: (monitor) => ({
      // Зададим прозрачность перетаскиваемому элементу для красоты
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <li ref={dragRef} style={{ opacity }} className={styles.item} onClick={handleClick}>
      <Counter
        count={item.type === "bun" ? (item._id === bun._id ? 2 : 0) : count}
        size="default"
      />
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
