import { getFogotPasswordOptions, request } from "../../utils/request";
import React, { FormEvent } from "react";
import { Form } from "../../components/Form/Form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const FogotPasswordPage: React.FC = () => {

  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    request("https://norma.nomoreparties.space/api/password-reset", getFogotPasswordOptions('zakharovamaria73@yandex.ru'));
  };

  return (
    <main>
      <Form title="Восстановление пароля" buttonText="Восстановить" handleSubmit={handleSubmit} handleChange={handleChange} values={values} isValid={isValid} errors={errors}/>
    </main>
  );
};

export default FogotPasswordPage;
