import React, { FormEvent } from "react";
import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { registerUserThunk } from "../../services/actions/userActions";

const RegisterPage: React.FC = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(registerUserThunk(values.name, values.email, values.password));
  };

  return (
    <main>
      <Form
        title="Регистрация"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default RegisterPage;
