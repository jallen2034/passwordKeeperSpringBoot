import React, {useEffect, useState} from "react"
import LoginPage from "./LoginPage/Loginpage."
import RegisterPage from "./RegisterPage/RegisterPage"
import VaultPage from "./VaultPage/VaultPage"
import VerificationPage from "./VerificationPage/VerificationPage"
import PwResetPage from "./PwResetPage/PwResetPage"
import PwResetForm from "./PwResetForm/PwResetForm"
// @ts-ignore
import { Route, Switch, useHistory } from "react-router-dom"
import '@fontsource/roboto/300.css'

export type AppState = {
  register: boolean;
  verified: null | any;
  passwordResetEmail: null | any;
  newPassword: null | any;
  newConfirmPassword: null | any;
  indexSelected: boolean;
  currentUserUuid: string | null | undefined;
  enabledUser: boolean | null | undefined;
};

type LocalStorageData = {
  sessionUuid?: string | undefined | null;
  enabled?: string | undefined | null ;
}

const fetchDataFromLocalStorage = (): LocalStorageData => {
  const sessionUuid: string | null | undefined = window.localStorage.getItem("Uuid")
  const enabled: string | null | undefined = window.localStorage.getItem("enabled")
  return { sessionUuid, enabled }
}

const saveSessionDataToAppState = (
  sessionData: LocalStorageData,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
): void => {  setAppState((prevState: AppState) => ({
    ...prevState,
    currentUserUuid: sessionData.sessionUuid,
    enabledUser: Boolean(sessionData.enabled)
  }));
}

const detectUsersSession = (
  setApplicationState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  const sessionData: LocalStorageData = fetchDataFromLocalStorage();
  saveSessionDataToAppState(sessionData, setApplicationState);
}

function App() {
  const history = useHistory()

  // Application state stored in a single clean finite state machine
  const [applicationState, setApplicationState] = useState<AppState>({
    register: false,
    verified: null,
    passwordResetEmail: null,
    newPassword: null,
    newConfirmPassword: null,
    indexSelected: true,
    currentUserUuid: null,
    enabledUser: null
  });

  // Only check the status of the users session once when the top level app component mounts
  useEffect(() => {
    detectUsersSession(setApplicationState);
  }, []);

  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginPage
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/register">
          <RegisterPage
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/vault">
          <VaultPage
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/verify:code">
          <VerificationPage
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/resetPassword">
          <PwResetPage
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/resetPasswordForm:code">
          <PwResetForm
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App
