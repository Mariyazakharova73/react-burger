import React from "react";
import styles from "./OrderCard.module.css";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../types/types";
import uuid from "react-uuid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
require("dayjs/locale/ru");
dayjs.extend(relativeTime);
dayjs.extend(calendar);

const OrderCard: React.FC<any> = ({ item, status }) => {
  const location = useLocation();

  const handleClick = () => {
    console.log("click");
  };

  const calculatePrice = (arr: IIngredient[]): number => {
    return arr.reduce((acc, curr) => {
      return acc + curr?.price;
    }, 0);
  };

  const getStringDate = (date: dayjs.Dayjs | Date) => {
    return `${dayjs(date)
      .locale("ru")
      .calendar(null, {
        sameDay: "[Сегодня], h:mm",
        lastDay: "[Вчера], h:mm",
        sameElse: `${dayjs(date).locale("ru").fromNow()}, h:mm`,
      })}`;
  };

  return (
    <Link
      key={item._id}
      to={location.pathname === "/feed" ? `/feed/${item._id}` : `/profile/orders/${item.id}`}
      state={{ background: location }}
      className={cn("", styles.link)}
    >
      <li className={cn("p-6", styles.item)} onClick={handleClick}>
        <div className={cn("mb-6", styles.order)}>
          <p className={cn("text text_type_digits-default", styles.number)}>#{item.number}</p>
          <p className={cn("text text_type_main-small text_color_inactive", styles.date)}>
            {getStringDate(item.createdAt)}
          </p>
        </div>
        <div className="mb-6">
          <h2 className={cn("text text_type_main-medium", styles.title)}>{item.name}</h2>
          {status ? (
            <p
              className={cn("text text_type_main-small mt-2", {
                [styles.done]: item.status,
              })}
            >
              {item.status ? "Выполнен" : "Создан"}
            </p>
          ) : null}
        </div>
        <div className={styles.imageWrapper}>
          <ul className={styles.imageItemWrapper}>
            {item.ingredients.slice(0, 6).map((ingredient: IIngredient, index: number) => {
              return (
                <li
                  key={uuid()}
                  className={cn(styles.listItem, {
                    [styles.overlay]: item.ingredients.length > 6 && index === 0,
                  })}
                >
                  <img
                    className={styles.image}
                    src={ingredient?.image}
                    alt={`${ingredient?.name}.`}
                  />
                </li>
              );
            })}
            {item.ingredients.length > 6 ? (
              <p className={styles.count}>+{item.ingredients.length - 6}</p>
            ) : null}
          </ul>
          <div className={styles.priceWrapper}>
            <CurrencyIcon type="primary" />
            <p className={cn("text text_type_digits-default", styles.price)}>
              {calculatePrice(item.ingredients)}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default OrderCard;
