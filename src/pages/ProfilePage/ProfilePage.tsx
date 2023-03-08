import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent } from "react";
import { NavLink } from "react-router-dom";
import styles from "../ProfilePage/ProfilePage.module.css";
import cn from "classnames";

const ProfilePage: React.FC = () => {
  const [values, setValues] = React.useState({ email: "", password: "", name: "", code: "" });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <NavLink
            className={({ isActive }) =>
              cn(styles.link, "text text_type_main-medium text_color_inactive", {
                [styles.selected]: isActive,
              })
            }
            to="/profile"
          >
            <p>Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={cn(styles.link, "text text_type_main-medium text_color_inactive")}
          >
            <p>История заказов</p>
          </NavLink>
        </nav>
        <button
          className={cn(styles.button, "text text_type_main-medium text_color_inactive")}
          type="button"
        >
          <p>Выход</p>
        </button>
        <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className="ml-15" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          size="default"
          icon="EditIcon"
          onChange={handleChange}
          value={values.name || ""}
          required
        />
        <Input
          extraClass="mt-6"
          placeholder="Логин"
          name="email"
          size="default"
          icon="EditIcon"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
        <PasswordInput
          extraClass="mt-6"
          name="password"
          icon="EditIcon"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
      </form>
    </main>
  );
};

export default ProfilePage;
