import React from "react";
import {throwAndLogExceptions} from "../../throw-and-log-exceptions";

const openResetPasswordPage = function (history: any) {
  try {
    history.push("/resetPassword")
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
}

export {
  openResetPasswordPage
}