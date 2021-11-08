import React, { useState } from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer';
import PasswordContainer from '../PasswordContainer/PasswordContainer';
import 'react-toastify/dist/ReactToastify.css';

function PasswordVault({ indexSelected, sessionUuid, enabledUser, currentUserUuid }) {
  return (
    <div>
      {indexSelected
        ? <PasswordContainer sessionUuid={sessionUuid} enabledUser={enabledUser} currentUserUuid={currentUserUuid} />
        : <PasswordComposer sessionUuid={sessionUuid} />
      }
    </div>
  );
}

export default PasswordVault;
