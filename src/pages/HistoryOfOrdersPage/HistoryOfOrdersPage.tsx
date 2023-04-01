import React from "react";
import Menu from "../../components/Menu/Menu";
import styles from "../HistoryOfOrdersPage/HistoryOfOrdersPage.module.css";
import { data } from "../FeedPage/FeedPage";
import OrderCard from "../../components/OrderCard/OrderCard";

const HistoryOfOrdersPage = () => {
  return (
    <main className={styles.wrapper}>
      <div className="pt-20">
        <Menu />
      </div>
      <div className={styles.historyCardsWrapper}>
        <ul className={styles.container}>
          {data.map((item) => {
            return <OrderCard key={item.number} item={item} status={true}></OrderCard>;
          })}
        </ul>
      </div>
    </main>
  );
};

export default HistoryOfOrdersPage;