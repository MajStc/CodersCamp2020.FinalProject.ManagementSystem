import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import FormStructure from "components/UI/formElements/formStructure/formStructure";
import Button from "components/UI/formElements/button/button";

import onChangeForm from "utils/onChangeForm";

import styles from "./forgotPassword.module.scss";

const ForgotPassword = () => {
  const history = useHistory();

  const [forgot, setForgot] = useState({
    email: {
      val: "",
      type: "email",
      inputType: "input",
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const onChangeReset = (
    event: { target: HTMLInputElement },
    inputType: keyof typeof forgot
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(event, inputType, forgot);

    /* Set up new state */
    setForgot((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  const goBackHandler = () => {
    history.push("/");
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.goBackBtn}>
        <Button clicked={goBackHandler}>Go back</Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("xD");
        }}
        className={styles.formStyles}
      >
        <FormStructure
          state={forgot}
          onChangeHandler={onChangeReset}
          btnText="RESET"
          formTitle="Reset password"
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
