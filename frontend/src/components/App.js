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
  const [register, setRegister] = useState(false)
  const [indexSelected, setIndexSelected] = useState(true)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null
  })

  return (
    <div>
      {(() => {
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
          )
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
          )
        } else {
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
                <ToastContainer
                  position="bottom-center"
                  autoClose={4000}
                />
              </div>
            </>
          )
        }
      })()}
    </div>
  )
}

export default App;