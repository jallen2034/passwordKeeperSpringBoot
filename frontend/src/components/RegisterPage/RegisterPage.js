import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import Register from "../Register/Register"
import '@fontsource/roboto/300.css'

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

export default RegisterPage