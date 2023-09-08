import React from "react";
import {AppState} from "../../app-types";

const buttonClick = function (
  history: any,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
) {
  setApplicationState((prevState: AppState) => ({
    ...prevState,
    verified: null,
    passwordResetEmail: null
  }));
  history.push("/login");
}

export {
  buttonClick
}