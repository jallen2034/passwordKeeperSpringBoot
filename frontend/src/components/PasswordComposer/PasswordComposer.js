import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PasswordFormTyped from '../PasswordFormTyped/PasswordFormTyped'
import PasswordForm from '../PasswordFormGenerate/PasswordForm';
import { Button } from '@material-ui/core'

// styling for text field component
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '10px'
  }
}));

function PasswordComposer() {
  const classes = useStyles();
  const [customFormSelected, setCustomFormSelected] = useState(false)

  const onClick = (buttonType) => {
    setCustomFormSelected(buttonType)
  }

  return (
    <div>
      <div className={classes.div}>
        <Button onClick={(event) => onClick(false)}>Generate Password</Button>
        <Button onClick={(event) => onClick(true)}>Type Password</Button>
      </div>
      {customFormSelected
        ? <PasswordFormTyped />
        : <PasswordForm />
      }
    </div>
  )
}

export default PasswordComposer;