// this is a copy of the app component purely for storybook. 
import { useState } from 'react'
import ButtonAppBar from './Appbar/Appbar'
import SignIn from './Login/Login'
import Register from './Register/Register'
import PasswordVault from './PasswordVault/PasswordVault'
import { ToastContainer } from 'react-toastify';

function App() {

  /* usestate our app will use we will drill down into our components
   * this is a hardcoded value for now */
  const sessionUuid = window.localStorage.getItem('Uuid')
  const [clickedPassword, setClickedPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [key, setKey] = useState(false)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null
  })

  if (!register && !currentUserUuid.uuid) {
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
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
          />
        </div>
      </>
    );
  } else if (register && !currentUserUuid.uuid) {
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
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
          />
          <PasswordVault></PasswordVault>
        </div>
        <div>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
          />
        </div>
      </>
    );
  }
}

export default App;