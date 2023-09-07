import { ToastContainer, toast } from "react-toastify"
import { Redirect } from "react-router-dom"
import PasswordVault from "../PasswordVault/PasswordVault"
import ButtonAppBar from "../Appbar/Appbar"
import '@fontsource/roboto/300.css'
import {AppState} from "../App";
import React from "react";

type VaultPageProps = {
  setCurrentUserUuid: any,
  currentUserUuid: any,
  register: any,
  setRegister: any,
  history: any,
  setEnabledUser: any,
  sessionUuid: any,
  enabledUser: any,
  enabled: any,
  setIndexSelected: any,
  indexSelected: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function VaultPage(props: VaultPageProps) {
  const {
    setCurrentUserUuid,
    currentUserUuid,
    register,
    setRegister,
    history,
    setEnabledUser,
    sessionUuid,
    enabledUser,
    enabled,
    setIndexSelected,
    indexSelected,
    applicationState,
    setApplicationState
  } = props;

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
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          <PasswordVault
            indexSelected={indexSelected}
            sessionUuid={currentUserUuid.uuid}
            enabledUser={enabledUser}
            currentUserUuid={currentUserUuid}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
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

export default VaultPage