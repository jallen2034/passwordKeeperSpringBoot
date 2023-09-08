import React from "react";
import {AppState} from "../../app-types";
import {throwAndLogExceptions} from "../../throw-and-log-exceptions";

const buttonClick = function (
  history: any,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
) {
  try {
    setApplicationState((prevState: AppState) => ({
      ...prevState,
      verified: null,
      passwordResetEmail: null
    }));
    history.push("/login");
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
}

export {
  buttonClick
}