import React from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { ICardListProps } from "../../types/types";

const CardList: React.FC<ICardListProps> = React.forwardRef(
  ({ arr, title, id, handleOpenIngredient}, ref) => {

    return (
      <div ref={ref} className={styles.wrapper} >
        <h2 id={id} className="mt-6 text text_type_main-medium">
          {title}
        </h2>
        <ul className={styles.list}>
          {arr.map((item) => {
            return <Card key={item._id} item={item} handleOpenIngredient={handleOpenIngredient} />;
          })}
        </ul>
      </div>
    );
  }
);

export default CardList;
