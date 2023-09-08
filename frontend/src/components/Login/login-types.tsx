import {AppState} from "../../app-types";
import React from "react";

export type SignInProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}