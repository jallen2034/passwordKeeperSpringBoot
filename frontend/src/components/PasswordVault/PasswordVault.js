import React, { useState } from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer';
import PasswordContainer from '../PasswordContainer/PasswordContainer';

function PasswordVault() {
  const [passwordContainerSelected, setPasswordContainerSelected] = useState(false)

  return (
    <div>
      {passwordContainerSelected
        ? <PasswordContainer />
        : <PasswordComposer />
      }
    </div>
  );
}

export default PasswordVault;
