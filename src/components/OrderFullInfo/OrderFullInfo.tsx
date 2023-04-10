import React from "react";
import styles from "./OrderFullInfo.module.css";
import cn from "classnames";
import image from "../../images/bun-01.png";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const data = {
  number: "#034533",
  title: "Black Hole Singularity острый бургер",
  date: "Вчера, 13:50",
  images: 4,
  price: "510",
  done: true,
  arr: [
    { name: "Флюоресцентная булка R2-D3", count: 2, price: 20, image: image },
    { name: "Филе Люминесцентного тетраодонтимформа", count: 1, price: 300, image: image },
    { name: "Соус традиционный галактический", count: 1, price: 30, image: image },
    { name: "Плоды фалленианского дерева", count: 1, price: 80, image: image },
  ],
};

const OrderFullInfo = () => {
  return (
    <div className={styles.wrapper}>
      <p className={cn("text text_type_digits-default mb-10", styles.number)}>{data.number}</p>
      <h1 className="text text_type_main-medium mb-3">{data.title}</h1>
      <p
        className={cn("text text_type_main-default mb-15", {
          [styles.done]: data.done,
        })}
      >
        {data.done ? "Выполнен" : "Создан"}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.arr.map((item) => {
            return (
              <li key={item.name} className={cn(styles.listItem, "mb-4")}>
                <div className={styles.imageWrapper}>
                  <img className={styles.image} src={item.image} alt="Ингредиент." />
                </div>
                <p className={cn("text text_type_main-default", styles.name)}>{item.name}</p>

                <div className={cn("text text_type_digits-default mr-6", styles.price)}>
                  {item.count} x {item.price} <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.summWrapper}>
        <p className="text text_type_main-default text_color_inactive">{data.date}</p>
        <div className={styles.summ}>
          {data.price} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFullInfo;
