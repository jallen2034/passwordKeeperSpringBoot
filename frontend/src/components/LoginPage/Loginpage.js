import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import SignIn from "../Login/Login"
import '@fontsource/roboto/300.css'

function LoginPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, history, setEnabledUser, sessionUuid, enabled, enabledUser, setVerified }) {
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

export default LoginPage