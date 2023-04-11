import React from "react";
import styles from "./FeedPage.module.css";
import cn from "classnames";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const data = [
  {
    number: "#034535",
    title: "Death Star Starship Main бургер",
    date: "Сегодня, 16:20",
    images: 4,
    price: "480",
    done: true,
    id: 1,
  },
  {
    number: "#034534",
    title: "Interstellar бургер",
    date: "Сегодня, 13:20",
    images: 9,
    price: "560",
    id: 2,
  },
  {
    number: "#034533",
    title: "Black Hole Singularity острый бургер",
    date: "Вчера, 13:50",
    images: 5,
    price: "510",
    id: 3,
  },
  {
    number: "#034532",
    title: "Supernova Infinity бургер",
    date: "2 дня назад, 21:53",
    images: 9,
    price: "320",
    id: 4,
  },
];

const digits: string[] = ["034533", "034532", "034530", "034527", "034525"];

const digitsInWork: string[] = ["034538", "034541", "034542"];

const FeedPage = () => {
  const allOrders = useTypedSelector((state) => state.ws?.data);
  console.log(allOrders)

  return (
    <main className={cn("pt-10", styles.content)}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={cn("pt-5", styles.wrapper)}>
        <div className={styles.container}>
          <ul className={styles.list}>
            {data.map((item) => {
              return <OrderCard key={item.number} item={item} />;
            })}
          </ul>
        </div>

        <div className={styles.digitsContainer}>
          <div className={styles.numbersContainer}>
            <div className={styles.numbersItemContainer}>
              <p className="text text_type_main-medium m-0 pb-6">Готовы:</p>
              <ul className={styles.digitsList}>
                {digits.map((item) => {
                  return (
                    <li
                      key={item}
                      className={cn("text text_type_digits-default pb-2", styles.digitsText)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.numbersItemContainer}>
              <p className="text text_type_main-medium m-0 pb-6">В работе:</p>
              <ul className={styles.digitsList}>
                {digitsInWork.map((item) => {
                  return (
                    <li key={item} className={cn("text text_type_digits-default pb-2")}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium m-0">Выполнено за все время:</p>
            <p className="m-0 text text_type_digits-large">28 752</p>
          </div>
          <div>
            <p className="text text_type_main-medium m-0">Выполнено за сегодня:</p>
            <p className="m-0 text text_type_digits-large">138</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeedPage;
