import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import PasswordVault from "../PasswordVault/PasswordVault"
import ButtonAppBar from "../Appbar/Appbar"
import {AppState} from "../../app-types";
import React from "react";
import '@fontsource/roboto/300.css'

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

  return (
    <>
      {(applicationState.enabledUser && applicationState.currentUserUuid) ? (
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
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}
    </>
  );
}

export default VaultPage