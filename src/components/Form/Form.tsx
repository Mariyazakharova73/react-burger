import React, { ChangeEvent, FormEvent } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../Form/Form.module.css";
import { Link, useLocation } from "react-router-dom";
import { IFormProps } from "../../types/types";

export const Form: React.FC<IFormProps> = ({ title, buttonText }) => {
  const [values, setValues] = React.useState({ email: "", password: "", name: "", code: "" });

  const { pathname } = useLocation();

  const isRegisterPage = pathname === "/register";
  const isLoginPage = pathname === "/login";
  const isFogotPasswordPage = pathname === "/forgot-password";
  const isResetPasswordPage = pathname === "/reset-password";

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={cn("text text_type_main-medium", styles.title)}>{title}</h1>
        {isRegisterPage && (
          <Input
            type="text"
            extraClass="mt-6"
            placeholder="Имя"
            name="name"
            size="default"
            onChange={handleChange}
            value={values.email || ""}
            required
          />
        )}
        {isRegisterPage || isLoginPage || isFogotPasswordPage ? (
          <EmailInput
            extraClass="mt-6"
            placeholder={isRegisterPage || isLoginPage ? "E-mail" : "Укажите e-mail"}
            name="email"
            size="default"
            onChange={handleChange}
            value={values.email || ""}
            required
          />
        ) : null}
        {isRegisterPage || isLoginPage || isResetPasswordPage ? (
          <PasswordInput
            icon="ShowIcon"
            extraClass="mt-6"
            placeholder={isRegisterPage || isLoginPage ? "Пароль" : "Введите новый пароль"}
            name="password"
            size="default"
            onChange={handleChange}
            value={values.password || ""}
            required
          />
        ) : null}
        {isResetPasswordPage && (
          <Input
            extraClass="mt-6"
            type="text"
            placeholder="Введите код из письма"
            name="code"
            size={"default"}
            onChange={handleChange}
            value={values.code || ""}
            required
          />
        )}
        <Button
          extraClass={cn(styles.button, "mt-6")}
          htmlType="submit"
          type="primary"
          size="medium"
          // disabled={!isValid}
        >
          {buttonText}
        </Button>
      </form>

      {isRegisterPage && (
        <div className={cn(styles.wrapper, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </div>
      )}

      {isLoginPage && (
        <>
          <div className={cn(styles.wrapper, "mt-20")}>
            <p className="text text_type_main-default text_color_inactive">
              Вы - новый пользователь?
            </p>
            <Link className={styles.link} to="/register">
              Зарегистрироваться
            </Link>
          </div>
          <div className={cn(styles.wrapper, "mt-4")}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
            <Link className={styles.link} to="/forgot-password">
              Восстановить пароль
            </Link>
          </div>
        </>
      )}
      {isFogotPasswordPage || isResetPasswordPage ? (
        <div className={cn(styles.wrapper, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Form;
