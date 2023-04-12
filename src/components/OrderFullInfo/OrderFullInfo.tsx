import React, { useEffect } from "react";
import styles from "./OrderFullInfo.module.css";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useParams } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import uuid from "react-uuid";
import {
  addDataForIngredients,
  calculateCount,
  calculateSumm,
  getIngredientsWithCount,
  getStringDate,
} from "../../utils/helpers";
import { getDataIngredients } from "../../services/actions/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const OrderFullInfo: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();
  let background = location.state && location.state.background;
  const orders = useTypedSelector((state) => state.ws.data[0]?.orders);
  const ingredients = useTypedSelector((state) => state.ingredients?.ingredients);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getDataIngredients());
    }
  }, [ingredients]);

  if (!ingredients || !orders) return <></>

  const newOrders = addDataForIngredients(orders, ingredients);
  const selectedOrderItem = newOrders?.filter((item) => {
    return item._id === id;
  })[0];

  const obj = calculateCount(selectedOrderItem?.ingredients);

  const newIngredients = getIngredientsWithCount(obj, ingredients);

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.indent]: !background,
      })}
    >
      <p
        className={cn("text text_type_digits-default mb-10", styles.number, {
          [styles.text]: background,
        })}
      >
        #{selectedOrderItem.number}
      </p>
      <h1 className="text text_type_main-medium mb-3">{selectedOrderItem.name}</h1>
      <p
        className={cn("text text_type_main-default mb-15", {
          [styles.done]: selectedOrderItem.status === "done",
        })}
      >
        {selectedOrderItem.status ? "Выполнен" : "Создан"}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.container}>
        <ul className={styles.list}>
          {newIngredients?.map((item) => {
            return (
              <li key={uuid()} className={cn(styles.listItem, "mb-4")}>
                <div className={styles.imageWrapper}>
                  <img className={styles.image} src={item?.image} alt={`${item.name}`} />
                </div>
                <p className={cn("text text_type_main-default", styles.name)}>{item.name}</p>
                <div className={cn("text text_type_digits-default mr-6", styles.price)}>
                  {item.count} x {item?.price} <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.summWrapper}>
        <p className="text text_type_main-default text_color_inactive">
          {getStringDate(selectedOrderItem.createdAt)}
        </p>
        <div className={styles.summ}>
          {calculateSumm(newIngredients)} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFullInfo;
