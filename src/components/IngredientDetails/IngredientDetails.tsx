import React from "react";
import styles from "./IngredientDetails.module.css";
import cn from "classnames";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const IngredientDetails: React.FC = () => {
  const selectedCard = useTypedSelector((state) => state.card.selectedCard);

  const info = [
    { title: "Калории,ккал", value: selectedCard.calories },
    { title: "Белки, г", value: selectedCard.proteins },
    { title: "Жиры, г", value: selectedCard.fat },
    { title: "Углеводы, г", value: selectedCard.carbohydrates },
  ];

  return (
    <div className={styles.wrapper}>
      <img
        src={selectedCard.image_large}
        alt={`${selectedCard.name}.`}
        className={cn("ml-5 mr-5", styles.image)}
      />
      <p className={cn("text text_type_main-medium mt-4", styles.title)}>{selectedCard.name}</p>
      <ul className={styles.list}>
        {info.map((item, index) => {
          return (
            <li className={styles.item} key={index}>
              <p className="text text_type_main-default text_color_inactive">{item.title}</p>
              <span className="text text_type_digits-default text_color_inactive">
                {item.value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientDetails;
