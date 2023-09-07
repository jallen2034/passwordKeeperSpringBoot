import React from "react";
import {AppState, LocalStorageData} from "./app-types";

const saveSessionDataToAppState = (
  sessionData: LocalStorageData,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
): void => {
  setAppState((prevState: AppState) => ({
    ...prevState,
    currentUserUuid: sessionData.sessionUuid,
    enabledUser: Boolean(sessionData.enabled)
  }));
}

const fetchDataFromLocalStorage = (): LocalStorageData => {
  const sessionUuid: string | null | undefined = window.localStorage.getItem("Uuid")
  const enabled: string | null | undefined = window.localStorage.getItem("enabled")
  return { sessionUuid, enabled }
}


const detectUsersSession = (
  setApplicationState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  const sessionData: LocalStorageData = fetchDataFromLocalStorage();
  saveSessionDataToAppState(sessionData, setApplicationState);
}

export {
  detectUsersSession,
  fetchDataFromLocalStorage,
  saveSessionDataToAppState
}