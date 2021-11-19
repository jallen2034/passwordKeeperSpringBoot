import React from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer'
import PasswordContainer from '../PasswordContainer/PasswordContainer'
import 'react-toastify/dist/ReactToastify.css'

function PasswordVault({ indexSelected, sessionUuid, enabledUser, currentUserUuid, setInitalLogin }) {
  return (
    <div>
      {indexSelected
        ? <PasswordContainer sessionUuid={sessionUuid} enabledUser={enabledUser} currentUserUuid={currentUserUuid} setInitalLogin={setInitalLogin} />
        : <PasswordComposer sessionUuid={sessionUuid} />
      }
    </div>
  )
}

export default PasswordVault
