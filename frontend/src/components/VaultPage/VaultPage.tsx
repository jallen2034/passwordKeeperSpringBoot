import { ToastContainer, toast } from "react-toastify"
import { Redirect } from "react-router-dom"
import PasswordVault from "../PasswordVault/PasswordVault"
import ButtonAppBar from "../Appbar/Appbar"
import '@fontsource/roboto/300.css'
import {AppState} from "../../app-types";
import React from "react";

type VaultPageProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function VaultPage(props: VaultPageProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  if (applicationState.enabledUser && applicationState.currentUserUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          <PasswordVault
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
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

export default VaultPage