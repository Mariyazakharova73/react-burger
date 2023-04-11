import React from "react";
import styles from "./OrderCard.module.css";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import image from "../../images/bun-01.png";
import { Link, useLocation } from "react-router-dom";


const OrderCard: React.FC<any> = ({ item, status }) => {
  const location = useLocation();

  const handleClick = () => {
    console.log("click");
  };

  return (
    <Link
      key={item.id}
      to={location.pathname === "/feed" ? `/feed/${item.id}` : `/profile/orders/${item.id}`}
      state={{ background: location }}
      className={cn("", styles.link)}
    >
      <li className={cn("p-6", styles.item)} onClick={handleClick}>
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
          <ul className={styles.imageItemWrapper}>
            <li className={cn(styles.listItem, { [styles.overlay]: item.images > 6 })}>
              <img className={styles.image} src={image} alt="Ингредиент." />
            </li>
            <li className={styles.listItem}>
              <img className={styles.image} src={image} alt="Ингредиент." />
            </li>
            <li className={styles.listItem}>
              <img className={styles.image} src={image} alt="Ингредиент." />
            </li>
            <li className={styles.listItem}>
              <img className={styles.image} src={image} alt="Ингредиент." />
            </li>
            <li className={styles.listItem}>
              <img className={styles.image} src={image} alt="Ингредиент." />
            </li>
            <li className={styles.listItem}>
              <img className={styles.image} src={image} alt="Ингредиент." />
            </li>
            {item.images > 6 ? <p className={styles.count}>+{item.images - 6}</p> : null}
          </ul>
          <div className={styles.priceWrapper}>
            <CurrencyIcon type="primary" />
            <p className={cn("text text_type_digits-default", styles.price)}>{item.price}</p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default OrderCard;
