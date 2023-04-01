import React from "react";
import styles from "./OrderCard.module.css";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderCard: React.FC<any> = ({ item, status }) => {
  return (
    <li className={cn("p-6", styles.item)}>
      <div className={cn("mb-6", styles.order)}>
        <p className={cn("text text_type_digits-default", styles.number)}>{item.number}</p>
        <p className={cn("text text_type_main-small text_color_inactive", styles.date)}>
          {item.date}
        </p>
      </div>
      <div className="mb-6">
        <h2 className={cn("text text_type_main-medium", styles.title)}>{item.title}</h2>
        {status ? (
          <p
            className={cn("text text_type_main-small mt-2", {
              [styles.done]: item.done,
            })}
          >
            {item.done ? "Выполнен" : "Создан"}
          </p>
        ) : null}
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageItemWrapper}>
          <div className={styles.image} />
          <div className={styles.image} />
          <div className={styles.image} />
          <div className={styles.image} />
          <div className={styles.image} />
          <div className={styles.image} />
          {item.images > 6 ? <p className={styles.count}>+{item.images - 6}</p> : null}
        </div>
        <div className={styles.priceWrapper}>
          <CurrencyIcon type="primary" />
          <p className={cn("text text_type_digits-default", styles.price)}>{item.price}</p>
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
