import React from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer'
import PasswordContainer from '../PasswordContainer/PasswordContainer'
import 'react-toastify/dist/ReactToastify.css'
import {AppState} from "../App";

type PasswordVaultProps = {
  indexSelected: any,
  sessionUuid: any,
  enabledUser: any,
  currentUserUuid: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function PasswordVault(props: PasswordVaultProps) {
  const {
    indexSelected,
    sessionUuid,
    enabledUser,
    currentUserUuid,
    applicationState,
    setApplicationState
  } = props;

  return (
    <div>
      {indexSelected
        ?
        <PasswordContainer
          sessionUuid={sessionUuid}
          enabledUser={enabledUser}
          currentUserUuid={currentUserUuid}
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />
        :
        <PasswordComposer sessionUuid={sessionUuid} />
      }
    </div>
  )
}

export default PasswordVault
