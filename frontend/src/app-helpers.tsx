import React from "react";
import {AppState, LocalStorageData} from "./app-types";
import {throwAndLogExceptions} from "./throw-and-log-exceptions";

const saveSessionDataToAppState = (
  sessionData: LocalStorageData,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
): void => {
  try {
    setAppState((prevState: AppState) => ({
      ...prevState,
      currentUserUuid: sessionData.sessionUuid,
      enabledUser: Boolean(sessionData.enabled)
    }));
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
}

const fetchDataFromLocalStorage = () => {
  try {
    const sessionUuid: string | null | undefined = window.localStorage.getItem("Uuid");
    const enabled: string | null | undefined = window.localStorage.getItem("enabled");
    return { sessionUuid, enabled }
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
}


const detectUsersSession = (
  setApplicationState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  try {
    const sessionData: any = fetchDataFromLocalStorage();
    saveSessionDataToAppState(sessionData, setApplicationState);
  } catch (e: any) {
    throwAndLogExceptions(e);
  }
}

export {
  detectUsersSession,
  fetchDataFromLocalStorage,
  saveSessionDataToAppState
}