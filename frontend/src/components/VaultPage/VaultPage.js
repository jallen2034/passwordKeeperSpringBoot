import { ToastContainer, toast } from "react-toastify"
import { Redirect } from "react-router-dom"
import PasswordVault from "../PasswordVault/PasswordVault"
import ButtonAppBar from "../Appbar/Appbar"

import '@fontsource/roboto/300.css'

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

export default VaultPage