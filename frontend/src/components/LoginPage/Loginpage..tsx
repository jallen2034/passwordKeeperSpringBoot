import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import SignIn from "../Login/login";
import {LoginPageProps} from "../Login/login-types";
import {AppState} from "../../app-types";
import '@fontsource/roboto/300.css'

function LoginPage( props: LoginPageProps ) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  useEffect(() => {
    setApplicationState((prevState: AppState) => ({
      ...prevState,
      verified: null
    }));
  }, [])

  if (!applicationState.enabledUser && !applicationState.currentUserUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            history={history}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          <SignIn
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