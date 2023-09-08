import React from "react";
import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../../components/Appbar/Appbar"
import Register from "../../components/Register/Register"
import {AppState} from "../../app-types";
import '@fontsource/roboto/300.css'

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

  return (
    <>
      {(!applicationState.enabledUser && !applicationState.currentUserUuid) ? (
        <div className="App">
          <ButtonAppBar
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          <Register />
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      ) : (
        <Redirect to={{ pathname: '/vault' }} />
      )}
    </>
  )
}

export default RegisterPage