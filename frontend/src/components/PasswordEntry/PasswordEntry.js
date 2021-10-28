import React from 'react'
import RelativeInformation from '../RelativeInfo/RelativeInformation'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, FormControl } from '@material-ui/core'

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
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 380
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '10px'
  }
}));


function PasswordEntry({ url, passwordText, category, id, name }) {
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl}>
        <RelativeInformation
          url={url}
          name={name}
          category={category}
        />
        <TextField
          value={passwordText}
        />
        <div className={classes.div}>
          <Button>Copy</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      </FormControl>
    </>
  )
}

export default PasswordEntry