import { useState } from 'react'
import RelativeInformation from '../RelativeInfo/RelativeInformation'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, FormControl, Dialog } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

function PasswordEntry({ url, passwordText, category, id, name, sessionUuid, deletePassword, editPasssword, setForceRender }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editField, setEditfield] = useState(passwordText)
  const [editedPasswordFromServer, setEditedPasswordFromServer] = useState({ value: null })

  const handleEditClickOpen = () => {
    setEdit(true);
  };

  const handleEditClickClose = () => {
    setEdit(false);
    setEditfield(passwordText)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyClick = (password) => {
    toast.success(`Password copied to clipboard: ${password}`)
  }

  // https://codezup.com/copy-data-to-clipboard-using-react-hooks-example/
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
            <Button onClick={(event) => deletePassword(passwordText, sessionUuid, id, setForceRender, handleClose)} color="primary" autoFocus>
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
        {edit
          ? <>
            <TextField
              value={editField}
              onChange={(event) => {
                setEditfield(event.target.value)
              }}
            />
            <div className={classes.div}>
              <Button onClick={handleEditClickClose}>Cancel</Button>
              <Button onClick={(event) => editPasssword(passwordText, editField, sessionUuid, id, handleEditClickClose, url, setEditedPasswordFromServer)}>Submit</Button>
            </div>
          </>
          : <>
            {editedPasswordFromServer.value
              ?
              <>
                <TextField
                  value={editedPasswordFromServer.value}
                />
                <div className={classes.div}>
                  <CopyToClipboard text={editedPasswordFromServer.value}>
                    <Button onClick={() => handleCopyClick(editedPasswordFromServer.value)}>Copy</Button>
                  </CopyToClipboard>
                  <Button onClick={handleEditClickOpen}>Edit</Button>
                  <Button onClick={handleClickOpen}>Delete</Button>
                </div>
              </>
              :
              <>
                <TextField
                  value={passwordText}
                />
                <div className={classes.div}>
                  <CopyToClipboard text={passwordText}>
                    <Button onClick={() => handleCopyClick(passwordText)}>Copy</Button>
                  </CopyToClipboard>
                  <Button onClick={handleEditClickOpen}>Edit</Button>
                  <Button onClick={handleClickOpen}>Delete</Button>
                </div>
              </>
            }
          </>
        }
      </FormControl>
    </>
  )
}

export default PasswordEntry