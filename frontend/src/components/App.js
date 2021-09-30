// this is a copy of the app component purely for storybook. 
import { useState } from 'react'
import ButtonAppBar from './Appbar/Appbar'
import SignIn from './Login/Login'
import Register from './Register/Register'
import PasswordVault from './PasswordVault/PasswordVault'

function App() {

  // usestate our app will use we will drill down into our components
  // this is a hardcoded value for now
  const sessionUuid = null
  const [clickedPassword, setClickedPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || false
  })

  if (!register && !currentUserUuid.uuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
          />
          <SignIn></SignIn>
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
          />
          <Register></Register>
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
          />
          <PasswordVault></PasswordVault>
        </div>
      </>
    );
  }
}

export default App;