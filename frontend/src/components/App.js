// this is a copy of the app component purely for storybook.
import { useState, useEffect } from "react";
import ButtonAppBar from "./Appbar/Appbar";
import SignIn from "./Login/Login";
import Register from "./Register/Register";
import PasswordVault from "./PasswordVault/PasswordVault";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

function LoginPage({ setCurrentUserUuid, currentUserUuid, register, setRegister }) {
  return (
    <>
      <div className="App">
        <ButtonAppBar
          setCurrentUserUuid={setCurrentUserUuid}
          currentUserUuid={currentUserUuid}
          register={register}
          setRegister={setRegister}
        />
        <SignIn setCurrentUserUuid={setCurrentUserUuid}></SignIn>
      </div>
      <div>
        <ToastContainer position="bottom-center" autoClose={4000} />
      </div>
    </>
  );
}

function RegisterPage({ setCurrentUserUuid, currentUserUuid, register, setRegister }) {
  return (
    <>
      <div className="App">
        <ButtonAppBar
          setCurrentUserUuid={setCurrentUserUuid}
          currentUserUuid={currentUserUuid}
          register={register}
          setRegister={setRegister}
        />
        <Register setCurrentUserUuid={setCurrentUserUuid}></Register>
      </div>
      <div>
        <ToastContainer position="bottom-center" autoClose={4000} />
      </div>
    </>
  );
}

function VaultPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, indexSelected }) {
  return (
    <>
      <div className="App">
        <ButtonAppBar
          setCurrentUserUuid={setCurrentUserUuid}
          currentUserUuid={currentUserUuid}
          register={register}
          setRegister={setRegister}
          setIndexSelected={setIndexSelected}
        />
        <PasswordVault
          indexSelected={indexSelected}
          sessionUuid={currentUserUuid.uuid}
        ></PasswordVault>
      </div>
      <div>
        <ToastContainer position="bottom-center" autoClose={4000} />
      </div>
    </>
  );
}

function App() {
  /* usestate our app will use we will drill down into our components
   * this is a hardcoded value for now */
  const history = useHistory()
  const sessionUuid = window.localStorage.getItem("Uuid");
  const [register, setRegister] = useState(false);
  const [indexSelected, setIndexSelected] = useState(true);
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null,
  });

  if (!register && !currentUserUuid.uuid) {
    history.push("/login")
  } else if (register && !currentUserUuid.uuid) {
    history.push("/register")
  } else {
    history.push("/vault")
  }

  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
          />
        </Route>
        <Route path="/register">
          <RegisterPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
          />
        </Route>
        <Route path="/vault">
          <VaultPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            setIndexSelected={setIndexSelected}
            indexSelected={indexSelected}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
