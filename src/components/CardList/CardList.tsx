import React from "react";
import { data, tabInfo } from "../../utils/data";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { ICardListProps } from "../../types/types";

const CardList: React.FC<ICardListProps> = ({ current }) => {
  const currentTabData = tabInfo.find((item) => item.key === current);
  const newData = data.filter((item) => item.type === currentTabData?.type);

  return (
    <div className={styles.wrapper}>
      <h2 className="mt-6 text text_type_main-medium">{currentTabData?.title}</h2>
      <ul className={styles.list}>
        {newData.map((item) => {
          return <Card key={item._id} name={item.name} price={item.price} image={item.image} />;
        })}
      </ul>
    </div>
  );
};

export default CardList;
