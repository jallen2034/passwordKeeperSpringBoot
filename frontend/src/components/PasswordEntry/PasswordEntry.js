import React from 'react'
import RelativeInformation from '../RelativeInfo/RelativeInformation'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../TextField/TextField'
import Button from '../Button/Button'

// styling for text field component
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    padding: '5px'
  }
}));


function PasswordEntry({url, passwordText, category, id, name}) {
  const classes = useStyles();

  return (
    <>
      <RelativeInformation
        url={url}
        name={name}
        category={category}
      />
      <TextField
        passwordText={passwordText}
      />
      <div>
        <Button
          type={"copy"}
          className={classes.button}
        />
        <Button
          type={"edit"}
          className={classes.button}
        />
        <Button
          type={"delete"}
          className={classes.button}
        />
      </div>
    </>
  )
}

export default PasswordEntry