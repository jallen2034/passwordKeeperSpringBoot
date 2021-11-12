// this is a copy of the app component purely for storybook.
import { useState, useEffect } from "react";
import ButtonAppBar from "./Appbar/Appbar";
import { Button, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
import SignIn from "./Login/Login";
import Register from "./Register/Register";
import PasswordVault from "./PasswordVault/PasswordVault";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Switch, useHistory, useParams, Redirect } from "react-router-dom";
import { verifyUser } from './axiosCalls';
import CircularProgress from '@material-ui/core/CircularProgress';

const buttonClick = function (setVerified, history) {
  setVerified(null)
  history.push("/login")
}

// https://www.youtube.com/watch?v=y_pr4lRoUto
function VerificationPage({ verified, setVerified, history, sessionUuid, enabled }) {
  const params = useParams()

  if (!verified) {
    verifyUser(params.code, setVerified)
  }

  if (params) {
    return (
      <>
        <div className="App">
          {verified
            ?
            <h1>
              {verified}
            </h1>
            :
            <div>
              <CircularProgress color="secondary" />
            </div>}
          <Button
            color="inherit"
            onClick={() => buttonClick(setVerified, history)}
          > Go Back to Login
          </Button>
        </div>
      </>
    )
  } else if (sessionUuid, enabled) {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

function LoginPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, history, setEnabledUser, sessionUuid, enabled, enabledUser }) {

  if (!enabled && !sessionUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
            setEnabledUser={setEnabledUser}
          />
          <SignIn
            setCurrentUserUuid={setCurrentUserUuid}
            setEnabledUser={setEnabledUser}
            currentUserUuid={currentUserUuid}
            enabledUser={enabledUser}
            history={history}
          />
        </div>
        <div>
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      </>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  }
}

function RegisterPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, history, enabled, sessionUuid }) {
  if (!enabled && !sessionUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
          />
          <Register setCurrentUserUuid={setCurrentUserUuid}></Register>
        </div>
        <div>
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      </>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  }
}

function VaultPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, indexSelected, history, setEnabledUser, enabledUser, sessionUuid, enabled }) {

  if (enabled && sessionUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            setIndexSelected={setIndexSelected}
            history={history}
            setEnabledUser={setEnabledUser}
          />
          <PasswordVault
            indexSelected={indexSelected}
            sessionUuid={currentUserUuid.uuid}
            enabledUser={enabledUser}
            currentUserUuid={currentUserUuid}
          ></PasswordVault>
        </div>
        <div>
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      </>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

function App() {
  const history = useHistory()
  const sessionUuid = window.localStorage.getItem("Uuid")
  const enabled = window.localStorage.getItem("enabled")
  const [register, setRegister] = useState(false)
  const [verified, setVerified] = useState(null)
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
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
