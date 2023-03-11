import React, { FormEvent } from "react";
import { useNavigate } from "react-router";
import Form from "../../components/Form/Form";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { ENDPOINT_FOR_FORGOT_PASSWORD } from "../../utils/constants";
import { getResetPasswordOptions, request } from "../../utils/request";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    request(ENDPOINT_FOR_FORGOT_PASSWORD, getResetPasswordOptions(values.password, values.code))
      .then(() => {
        InfoNotification("Пароль успешно изменен!");
        navigate("/login");
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка! Пропробуйте снова!");
        console.log(err);
      });
  };

  return (
    <main>
      <Form
        title="Изменение пароля"
        buttonText="Сохранить"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default ResetPasswordPage;
