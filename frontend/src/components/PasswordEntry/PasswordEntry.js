import React from 'react'
import RelativeInformation from '../RelativeInfo/RelativeInformation'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, FormControl, Dialog } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

function PasswordEntry({ url, passwordText, category, id, name, sessionUuid, deletePassword, setForceRender }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete password?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting a password is permanent! Would you like to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Go back
            </Button>
            <Button onClick={(event) => deletePassword(id, passwordText, sessionUuid, id, setForceRender, handleClose)} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <FormControl className={classes.formControl}>
        <RelativeInformation
          url={url}
          name={name}
          category={category}
          id={id}
        />
        <TextField
          value={passwordText}
        />
        <div className={classes.div}>
          <Button>Copy</Button>
          <Button>Edit</Button>
          <Button onClick={handleClickOpen}>Delete</Button>
        </div>
      </FormControl>
    </>
  )
}

export default PasswordEntry