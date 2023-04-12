import React from "react";
import Menu from "../../components/Menu/Menu";
import styles from "../HistoryOfOrdersPage/HistoryOfOrdersPage.module.css";
import OrderCard from "../../components/OrderCard/OrderCard";

export const data = [
  {
    ingredients: [],
    _id: "",
    status: "",
    name: "",
    number: 1,
    createdAt: "2023-04-12T10:02:42.751Z",
    updatedAt: "2023-04-12T10:02:42.751Z",
  },
];

const HistoryOfOrdersPage: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <div className="pt-20">
        <Menu />
      </div>
      <div className={styles.historyCardsWrapper}>
        <ul className={styles.container}>
          {data.map((item) => {
            return <OrderCard key={item.number} item={item} status={true} />;
          })}
        </ul>
      </div>
    </main>
  );
};

export default HistoryOfOrdersPage;
