import React, {ChangeEvent} from "react";
import {registerUser} from "../../network-requests/axiosCalls";
import {RegisterForm} from "./register-types";

const handleInputChange = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterForm>>
) => {
  const { name, value } = event.target;
  setRegisterForm((prevForm: RegisterForm) => ({
    ...prevForm,
    [name]: value
  }));
};

const handleSubmit = (
  event: React.FormEvent,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  event.preventDefault();
  registerUser(event, email, password, passwordConfirm);
};

export {
  handleInputChange,
  handleSubmit
}