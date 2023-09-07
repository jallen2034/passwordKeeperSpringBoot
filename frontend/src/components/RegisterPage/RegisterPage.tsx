import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import Register from "../Register/Register"
import '@fontsource/roboto/300.css'
import {AppState} from "../../App";
import React from "react";

type RegisterPageProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function RegisterPage(props: RegisterPageProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  if (!applicationState.enabledUser && !applicationState.currentUserUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          <Register/>
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