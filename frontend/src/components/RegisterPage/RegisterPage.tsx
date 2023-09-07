import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import Register from "../Register/Register"
import '@fontsource/roboto/300.css'
import {AppState} from "../App";
import React from "react";

type RegisterPageProps = {
  setCurrentUserUuid: any,
  currentUserUuid: any,
  register: any,
  setRegister: any,
  history: any,
  enabled: any,
  sessionUuid: any,
  setEnabledUser: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function RegisterPage(props: RegisterPageProps) {
  const {
    setCurrentUserUuid,
    currentUserUuid,
    register,
    setRegister,
    history,
    enabled,
    setEnabledUser,
    sessionUuid,
    applicationState,
    setApplicationState
  } = props;

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
            applicationState={applicationState}
            setEnabledUser={setEnabledUser}
            setApplicationState={setApplicationState}
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

export default RegisterPage