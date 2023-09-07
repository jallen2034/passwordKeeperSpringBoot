import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import SignIn from "../Login/login";
import '@fontsource/roboto/300.css'
import {AppState} from "../App";
import React from "react";

type LoginPageProps = {
  setCurrentUserUuid: any,
  currentUserUuid: any,
  register: any,
  setRegister: any,
  history: any,
  setEnabledUser: any,
  sessionUuid: any,
  enabledUser: any,
  setVerified: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
  enabled: any,
}

function LoginPage( props: LoginPageProps ) {
  const {
    setCurrentUserUuid,
    currentUserUuid,
    register,
    setRegister,
    history,
    setEnabledUser,
    sessionUuid,
    enabledUser,
    setVerified,
    enabled,
    applicationState,
    setApplicationState
  } = props;

  setVerified(null)

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
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          <SignIn
            setCurrentUserUuid={setCurrentUserUuid}
            setEnabledUser={setEnabledUser}
            currentUserUuid={currentUserUuid}
            enabledUser={enabledUser}
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
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

export default LoginPage