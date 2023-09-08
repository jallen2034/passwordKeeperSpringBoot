import React, { useState } from 'react'
import PasswordFormTyped from '../PasswordFormTyped/PasswordFormTyped'
import PasswordForm from '../PasswordFormGenerate/PasswordForm'
import { Button } from '@material-ui/core'
import {useStyles} from "./Password-composer-styles";

function PasswordComposer({ sessionUuid }) {
  const classes = useStyles()
  const [customFormSelected, setCustomFormSelected] = useState(false)

  const onClick = (buttonType) => {
    setCustomFormSelected(buttonType)
  }

  return (
    <div className={classes.div}>
      <div className={classes.formButtons}>
        <Button onClick={() => onClick(false)}>Generate Password</Button>
        <Button onClick={() => onClick(true)}>Type Password</Button>
      </div>
      {customFormSelected
        ? <PasswordFormTyped sessionUuid={sessionUuid} />
        : <PasswordForm sessionUuid={sessionUuid} />
      }
    </div>
  )
}

export default PasswordComposer