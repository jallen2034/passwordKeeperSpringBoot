import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import ButtonAppBar from "../Appbar/Appbar"
import SignIn from "../Login/login";
import {LoginPageProps} from "./login-page-types";
import {AppState} from "../../app-types";
import '@fontsource/roboto/300.css'

function LoginPage( props: LoginPageProps ) {
  const { history, applicationState, setApplicationState } = props;

  // Reset the users verified status in the application state when the user navigates to the login page
  // useEffect(() => {
  //   setApplicationState((prevState: AppState) => ({ ...prevState, verified: null }));
  // }, [])

  // Conditionally render the login page or redirect to the vault if the user is logged in
  return (
    <>
      {(!applicationState.enabledUser && !applicationState.currentUserUuid) ? (
        <>
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
          <ToastContainer position="bottom-center" autoClose={4000} />
        </>
      ) : (
        <Redirect to={{ pathname: '/vault' }} />
      )}
    </>
  )
}

export default LoginPage