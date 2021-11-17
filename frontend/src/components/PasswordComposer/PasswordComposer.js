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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  },
  formButtons: {
    marginBottom: "10px",
    marginTop: "5px"
  }
}));

function PasswordComposer({ sessionUuid }) {
  const classes = useStyles();
  const [customFormSelected, setCustomFormSelected] = useState(false)

  const onClick = (buttonType) => {
    setCustomFormSelected(buttonType)
  }

  return (
    <div className={classes.div}>
      <div className={classes.formButtons}>
        <Button onClick={(event) => onClick(false)}>Generate Password</Button>
        <Button onClick={(event) => onClick(true)}>Type Password</Button>
      </div>
      {customFormSelected
        ? <PasswordFormTyped sessionUuid={sessionUuid} />
        : <PasswordForm sessionUuid={sessionUuid} />
      }
    </div>
  )
}

export default PasswordComposer;