import React, { useState } from 'react'
import PasswordComposer from '../PasswordComposer/PasswordComposer';
import PasswordContainer from '../PasswordContainer/PasswordContainer';
import 'react-toastify/dist/ReactToastify.css';

function PasswordVault({ indexSelected, sessionUuid }) {
  const [forceRender, setForceRender] = useState({ value: null })

  return (
    <div>
      {indexSelected
        ? <PasswordContainer 
        sessionUuid={sessionUuid} 
        setForceRender={setForceRender} 
        forceRender={forceRender}
        />
        : <PasswordComposer sessionUuid={sessionUuid} />
      }
    </div>
  );
}

export default PasswordVault;
