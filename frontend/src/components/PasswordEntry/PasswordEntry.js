import { useState, useEffect } from 'react'
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

// https://stackoverflow.com/questions/52596070/materialui-custom-hover-style
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  buttonCopy: {
    padding: '5px',
    marginRight: '5px',
    backgroundColor: "#f0f0f0",
    '&:hover': {
      backgroundColor: "#96d3dd",
    },
  },
  buttonEdit: {
    padding: '0px',
    marginRight: '5px',
    backgroundColor: "#e8e8e8",
    '&:hover': {
      backgroundColor: "#389cfb",
    },
  },
  buttonDelete: {
    padding: '5px',
    marginRight: '5px',
    backgroundColor: "#dbdbdb",
    '&:hover': {
      backgroundColor: "#e67683",
    },
  },
  formControl: {
    margin: theme.spacing(2),
    maxWidth: 400,
    borderRadius: '30px',
    backgroundColor: 'white',
    paddingLeft: '20px',
    paddingRight: '20px',
    '&:hover': {
      background: "#f7f7f7",
    },
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  textField: {
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
    paddingLeft: '10px',
    paddingRight: '5px'
  },
  textFieldNoSelect: {
    backgroundColor: 'f7f7f7',
    borderRadius: '5px',
    paddingLeft: '10px',
    paddingRight: '5px',
    marginRight: '10px'
  }
}))

const textFieldManager = function (editedPasswordFromServer, setEditTextfield, passwordText) {

  if ((editedPasswordFromServer.length === 2) || (editedPasswordFromServer.length === 1 && editedPasswordFromServer[0] !== '')) {
    setEditTextfield(editedPasswordFromServer[0])
  } else {
    setEditTextfield(passwordText)
  }
}

function PasswordEntry({ url, passwordText, category, id, name, sessionUuid, deletePassword, editPasssword, setForceRender, pwned }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [editFlag, setEditFlag] = useState(false)
  const [editTextField, setEditTextfield] = useState(passwordText)
  const [editedPasswordFromServer, setEditedPasswordFromServer] = useState([""])

  useEffect(() => {
    handleSubmitClose()
  }, [editedPasswordFromServer])

  const handleEditClickOpen = () => {
    setEditFlag(true)
  }

  const handleSubmitClose = () => {
    setEditFlag(false)
    textFieldManager(editedPasswordFromServer, setEditTextfield, passwordText)
  }

  const handleEditClickClose = () => {
    setEditFlag(false)
    textFieldManager(editedPasswordFromServer, setEditTextfield, passwordText)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
          pwned={pwned}
        />
        {editFlag
          ? <>
            <TextField
              className={classes.textFieldNoSelect}
              value={editTextField}
              onChange={(event) => {
                setEditTextfield(event.target.value)
              }}
            />
            <div className={classes.div}>
              <Button className={classes.buttonDelete} onClick={handleEditClickClose}>Cancel</Button>
              <Button className={classes.buttonEdit} onClick={(event) => editPasssword(passwordText, editTextField, sessionUuid, id, url, setEditedPasswordFromServer, editedPasswordFromServer)}>Submit</Button>
            </div>
          </>
          : <>
            {(editedPasswordFromServer.length === 2) || (editedPasswordFromServer.length === 1 && editedPasswordFromServer[0] !== '')
              ?
              <>
                <TextField
                  className={classes.textField}
                  value={editedPasswordFromServer[0]}
                  type="password"
                />
                <div className={classes.div}>
                  <CopyToClipboard text={editedPasswordFromServer.value}>
                    <Button className={classes.buttonCopy} onClick={() => handleCopyClick(editedPasswordFromServer[0])}>Copy</Button>
                  </CopyToClipboard>
                  <Button className={classes.buttonEdit} onClick={handleEditClickOpen}>Edit</Button>
                  <Button className={classes.buttonDelete} onClick={handleClickOpen}>Delete</Button>
                </div>
              </>
              :
              <>
                <TextField
                  className={classes.textField}
                  value={passwordText}
                  type="password"
                />
                <div className={classes.div}>
                  <CopyToClipboard text={passwordText}>
                    <Button className={classes.buttonCopy} onClick={() => handleCopyClick(passwordText)}>Copy</Button>
                  </CopyToClipboard>
                  <Button className={classes.buttonEdit} onClick={handleEditClickOpen}>Edit</Button>
                  <Button className={classes.buttonDelete} onClick={handleClickOpen}>Delete</Button>
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