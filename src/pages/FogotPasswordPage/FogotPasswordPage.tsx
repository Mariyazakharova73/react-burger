import { getFogotPasswordOptions, request } from "../../utils/request";
import React, { FormEvent } from "react";
import { Form } from "../../components/Form/Form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { ENDPOINT_FOR_FORGOT_PASSWORD } from "../../utils/constants";
import { Navigate, useNavigate } from "react-router";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const FogotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useTypedSelector((state) => state.user);
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    request(ENDPOINT_FOR_FORGOT_PASSWORD, getFogotPasswordOptions(values.email))
      .then(() => {
        InfoNotification("Вам на почту отправлено письмо с кодом подтверждения!");
        navigate("/reset-password", { state: "/forgot-password" });
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка при восстановлении пароля!");
        console.log(err);
      });
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <main>
      <Form
        title="Восстановление пароля"
        buttonText="Восстановить"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default FogotPasswordPage;
