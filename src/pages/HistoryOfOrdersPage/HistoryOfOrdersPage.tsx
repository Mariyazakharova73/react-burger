import React, { useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import styles from "../HistoryOfOrdersPage/HistoryOfOrdersPage.module.css";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { wsActionTypes } from "../../types/wsTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const HistoryOfOrdersPage: React.FC = () => {
  const userOrders = useTypedSelector((state) => state.ws.data[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: wsActionTypes.WS_CONNECTION_START_ORDERS });
    return () => {
      dispatch({ type: wsActionTypes.WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <main className={styles.wrapper}>
      <div className="pt-20">
        <Menu />
      </div>
      <div className={styles.historyCardsWrapper}>
        <ul className={styles.container}>
          {userOrders?.orders.map((item) => {
            return <OrderCard key={item.number} item={item} status={true} />;
          })}
        </ul>
      </div>
    </main>
  );
};

export default HistoryOfOrdersPage;
