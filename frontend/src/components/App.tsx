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
  currentUserUuid:string | null | undefined;
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
  const sessionUuid = window.localStorage.getItem("Uuid")
  const enabled = window.localStorage.getItem("enabled")
  const [register, setRegister] = useState<boolean>(false)
  const [verified, setVerified] = useState(null)
  const [passwordResetEmail, setPasswordResetEmail] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [newConfirmPassword, setNewConfirmPassword] = useState(null)
  const [indexSelected, setIndexSelected] = useState(true)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null
  })
  const [enabledUser, setEnabledUser] = useState({
    enabled: enabled || null
  })

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
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
            setEnabledUser={setEnabledUser}
            sessionUuid={sessionUuid}
            enabled={enabled}
            enabledUser={enabledUser}
            setVerified={setVerified}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/register">
          <RegisterPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
            sessionUuid={sessionUuid}
            enabled={enabled}
            setEnabledUser={setEnabledUser}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/vault">
          <VaultPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            setIndexSelected={setIndexSelected}
            indexSelected={indexSelected}
            history={history}
            setEnabledUser={setEnabledUser}
            enabledUser={enabledUser}
            sessionUuid={sessionUuid}
            enabled={enabled}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/verify:code">
          <VerificationPage
            verified={verified}
            setVerified={setVerified}
            history={history}
            sessionUuid={sessionUuid}
            enabled={enabled}
            setPasswordResetEmail={setPasswordResetEmail}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/resetPassword">
          <PwResetPage
            setVerified={setVerified}
            history={history}
            setPasswordResetEmail={setPasswordResetEmail}
            passwordResetEmail={passwordResetEmail}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
        <Route path="/resetPasswordForm:code">
          <PwResetForm
            setVerified={setVerified}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newConfirmPassword={newConfirmPassword}
            setNewConfirmPassword={setNewConfirmPassword}
            history={history}
            setPasswordResetEmail={setPasswordResetEmail}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App
