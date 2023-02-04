import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import cn from "classnames";

const AppHeader = () => {
  return (
    <header className={cn("pt-4 pb-4", styles.header)}>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} to="/">
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/orders">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </Link>
            </li>
          </ul>
        </nav>
        <Logo className="ml-33 mr-72" />
      </div>
      <Link className={styles.link} to="/profile">
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
      </Link>
    </header>
  );
};

export default AppHeader;
