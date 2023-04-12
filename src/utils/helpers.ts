import dayjs from "dayjs";
import { ICount, IIngredient, TNewIngredient } from "./../types/types";
import { IWSNewOrder, IWSOrder } from "./../types/wsTypes";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
require("dayjs/locale/ru");
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const addDataForIngredients = (ordersArr: IWSOrder[], ingredientsArr: IIngredient[]) => {
  return ordersArr?.map((item) => {
    const newIngredients = item.ingredients?.map((id) => {
      return ingredientsArr?.find((el) => {
        return el._id === id;
      });
    });
    return { ...item, ingredients: newIngredients };
  });
};

export const calculatePrice = (arr: IIngredient[]): number => {
  return arr?.reduce((acc, curr) => {
    return acc + curr?.price;
  }, 0);
};

export const getStringDate = (date: string) => {
  return `${dayjs(date)
    .locale("ru")
    .calendar(null, {
      sameDay: "[Сегодня], h:mm",
      lastDay: "[Вчера], h:mm",
      sameElse: `${dayjs(date).locale("ru").fromNow()}, h:mm`,
    })}`;
};

export const calculateCount = (arr: any[]) => {
  const countItems: ICount = {};
  for (const item of arr) {
    countItems[item._id] = countItems[item._id] ? countItems[item._id] + 1 : 1;
  }
  return countItems;
};

export const getIngredientsWithCount = (obj: ICount, arr: IIngredient[]) => {
  let newIngredients: TNewIngredient[] = [];
  for (let key in obj) {
    arr.forEach((item) => {
      if (item._id === key) {
        newIngredients.push({ ...item, count: obj[key] });
      }
    });
  }
  return newIngredients;
};

export const calculateSumm = (arr: TNewIngredient[]) => {
  return arr?.reduce((acc, curr) => {
    return acc + curr?.count * curr?.price;
  }, 0);
};
