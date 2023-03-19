import React, { FormEvent } from "react";
import { Form } from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { authorizeUserThunk } from "../../services/actions/userActions";

const LoginPage: React.FC = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(authorizeUserThunk(values.email, values.password));
  };

  return (
    <main>
      <Form
        title="Вход"
        buttonText={"Войти"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default LoginPage;
