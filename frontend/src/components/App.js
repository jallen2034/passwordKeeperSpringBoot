// this is a copy of the app component purely for storybook.
import { useState } from "react"
import LoginPage from "./LoginPage/Loginpage"
import RegisterPage from "./RegisterPage/RegisterPage"
import VaultPage from "./VaultPage/VaultPage"
import VerificationPage from "./VerificationPage/VerificationPage"
import PwResetPage from "./PwResetPage/PwResetPage"
import PwResetForm from "./PwResetForm/PwResetForm"
import { Route, Switch, useHistory } from "react-router-dom"
import '@fontsource/roboto/300.css'

function App() {
  const history = useHistory()
  const sessionUuid = window.localStorage.getItem("Uuid")
  const enabled = window.localStorage.getItem("enabled")
  const [register, setRegister] = useState(false)
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
          />
        </Route>
        <Route path="/resetPassword">
          <PwResetPage
            setVerified={setVerified}
            history={history}
            setPasswordResetEmail={setPasswordResetEmail}
            passwordResetEmail={passwordResetEmail}
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
          />
        </Route>
      </Switch>
    </>
  )
}

export default App
