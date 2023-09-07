import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import SignIn from "../Login/login";
import '@fontsource/roboto/300.css'
import {AppState} from "../App";
import React, {useEffect} from "react";

type LoginPageProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
  enabled: any,
}

function LoginPage( props: LoginPageProps ) {
  const {
    history,
    enabled,
    applicationState,
    setApplicationState
  } = props;

  useEffect(() => {
    setApplicationState((prevState: AppState) => ({
      ...prevState,
      verified: null
    }));
  }, [])

  if (!enabled && !applicationState.currentUserUuid) {
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