import React from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer'
import PasswordContainer from '../PasswordContainer/PasswordContainer'
import {AppState} from "../../app-types";
import 'react-toastify/dist/ReactToastify.css'

type PasswordVaultProps = {
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function PasswordVault(props: PasswordVaultProps) {
  const {
    applicationState,
    setApplicationState,
  } = props;

  return (
    <div>
      {applicationState.indexSelected
        ?
        <PasswordContainer
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />
        :
        <PasswordComposer
          sessionUuid={applicationState.currentUserUuid}
        />
      }
    </div>
  )
}

export default PasswordVault
