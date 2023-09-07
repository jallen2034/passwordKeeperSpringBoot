import React from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer'
import PasswordContainer from '../PasswordContainer/PasswordContainer'
import 'react-toastify/dist/ReactToastify.css'
import {AppState} from "../App";

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
        <PasswordComposer sessionUuid={applicationState.currentUserUuid} />
      }
    </div>
  )
}

export default PasswordVault
