import React, { useCallback } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import cn from "classnames";
import { IBurgerConstructorProps } from "../../types/types";
import uuid from "react-uuid";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { addIngredient, setCurrentBun, updateIngredients } from "../../services/actions/actions";
import OrderedIngredient from "../OrderedIngredient/OrderedIngredient";

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({ handleOpenOrder }) => {
  const dispatch = useAppDispatch();
  const draggedElements = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);

  const calculateThePrice = () => {
    const priceOfFillings = x.reduce((acc, item: any) => {
      return acc + item.price;
    }, 0);
    const priceOfBuns = bun?.price * 2;
    return priceOfFillings + priceOfBuns;
  };

  const [{ isHover }, dropTargerRef] = useDrop({
    // Такой тип как у перетаскиваемого ингредиента
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    // выполняем диспатч в стор, в момент "бросания" ингредиента
    drop(item: any) {
      if (item.type !== "bun") {
        dispatch(addIngredient({ ...item, dragId: uuid() }));
      }
    },
  });

  const [{ isHoverBun }, dropTargerRefBun] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
    drop(item: any) {
      if (item.type === "bun") {
        dispatch(setCurrentBun(item));
      }
    },
  });

  // Коллбэк, в котором ингредиенты меняются местами, если один накладывается на другой
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // Получаем перетаскиваемый ингредиент
      const dragCard = draggedElements[dragIndex];
      const newCards = [...draggedElements];
      // Удаляем перетаскиваемый элемент из массива
      newCards.splice(dragIndex, 1);
      // Вставляем элемент на место того элемента, над которым мы навели мышку с "перетаскиванием"
      // создается новый массив, в котором изменен порядок элементов
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(updateIngredients(newCards));
    },
    [draggedElements, dispatch]
  );

  const x = React.useMemo(() => {
    return draggedElements.filter((item) => item.type !== "bun");
  }, [draggedElements]);

  return (
    <section className={cn("pl-4 pt-25", styles.wrapper)}>
      <div ref={dropTargerRefBun} className={`${isHoverBun ? styles.onHover : ""}`}>
        <ConstructorElement
          extraClass={cn("ml-6 mr-2", styles.element)}
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul
        className={cn("pr-2", styles.list, `${isHover ? styles.onHover : ""}`)}
        ref={dropTargerRef}
      >
        {x[0] ? (
          x.map((item, index) => {
            return (
              <OrderedIngredient key={item.dragId} index={index} item={item} moveCard={moveCard} />
            );
          })
        ) : (
          <div className={styles.ingredients}>
            Вы можете поменять булочку, добавить начинку и соусы.
          </div>
        )}
      </ul>
      <ConstructorElement
        extraClass={cn("ml-6 mr-2", styles.element)}
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />

      <div className={cn("mt-10", styles.container)}>
        <p className={cn("text text_type_digits-medium mr-10", styles.sum)}>
          <>
            {calculateThePrice()}
            <CurrencyIcon type="primary" />
          </>
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
