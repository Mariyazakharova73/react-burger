import { useLocation } from "react-router";
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
  const { pathname } = useLocation();
  return (
    <header className={cn("pt-4 pb-4", styles.header)}>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} to="/">
                <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
                <p
                  className={cn("text text_type_main-default text_color_inactive", {
                    [styles.active]: pathname === "/",
                  })}
                >
                  Конструктор
                </p>
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/orders">
                <ListIcon type={pathname === "/orders" ? "primary" : "secondary"} />
                <p
                  className={cn("text text_type_main-default text_color_inactive", {
                    [styles.active]: pathname === "/orders",
                  })}
                >
                  Лента заказов
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <Logo className="ml-33 mr-72" />
      </div>
      <Link className={styles.link} to="/profile">
        <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
        <p
          className={cn("text text_type_main-default text_color_inactive", {
            [styles.active]: pathname === "/profile",
          })}
        >
          Личный кабинет
        </p>
      </Link>
    </header>
  );
};

export default AppHeader;
