import {AppState} from "../../app-types";
import React from "react";

export type ButtonAppBarProps = {
  history: any,
  applicationState: AppState,
  setApplicationState: React.Dispatch<React.SetStateAction<AppState>>
}