import React, {ChangeEvent} from "react";
import {registerUser} from "../../network-requests/axiosCalls";
import {throwAndLogExceptions} from "../../throw-and-log-exceptions";
import {RegisterForm} from "./register-types";

const handleInputChange = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterForm>>
) => {
  try {
    const { name, value } = event.target; // Destructure the name and value from the event target
    setRegisterForm((prevForm: RegisterForm) => ({
      ...prevForm,
      [name]: value // Update the form state for the relevant field with the new value
    }));
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
};

const handleSubmit = (
  event: React.FormEvent,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    event.preventDefault();
    registerUser(event, email, password, passwordConfirm);
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
};

export {
  handleInputChange,
  handleSubmit
}