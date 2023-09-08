import React from "react";
import {AppState} from "../../app-types";

export type LoginPageProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}
