import React, {useEffect, useState} from "react"
import LoginPage from "./components/LoginPage/Loginpage."
import RegisterPage from "./components/RegisterPage/RegisterPage"
import VaultPage from "./components/VaultPage/VaultPage"
import VerificationPage from "./components/VerificationPage/VerificationPage"
import PwResetPage from "./components/PwResetPage/PwResetPage"
import PwResetForm from "./components/PwResetForm/PwResetForm"
import {detectUsersSession} from "./app-helpers";
import { Route, Switch, useHistory } from "react-router-dom"
import {AppState} from "./app-types";
import '@fontsource/roboto/300.css'

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
