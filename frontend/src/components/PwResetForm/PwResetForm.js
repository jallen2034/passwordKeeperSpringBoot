import { ToastContainer } from "react-toastify"
import { useParams } from "react-router-dom"
import { Button, Typography } from '@material-ui/core'
import { resetUsersPassword } from '../axiosCalls'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import '@fontsource/roboto/300.css'
import { makeStyles } from '@material-ui/core/styles'

// https://stackoverflow.com/questions/60969224/how-to-override-muipaper-root-style-in-material-table
const useStyles = makeStyles((theme) => ({
  reset: {
    height: '100vh',
    backgroundImage: 'url(https://www.metacompliance.com/wp-content/uploads/2021/03/Password-Policy-Best-Practices-2021.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(10),
      width: theme.spacing(70),
      height: theme.spacing(36),
    },
    "& .MuiPaper-root": {
      paddingTop: "35px",
      paddingLeft: "45px",
      paddingRight: "45px",
      paddingBottom: "55px",
    },
  },
  buttonBack: {
    backgroundColor: "#ebebeb",
    '&:hover': {
      backgroundColor: "#96d3dd",
    },
  },
}))

const buttonClick = function (setVerified, history, setPasswordResetEmail) {
  setVerified(null)
  setPasswordResetEmail(null)
  history.push("/login")
}

function PwResetForm({ setVerified, newPassword, setNewPassword, newConfirmPassword, setNewConfirmPassword, history, setPasswordResetEmail }) {
  const classes = useStyles()
  const params = useParams()

  return (
    <>
      <div className={classes.reset}>
        <Paper elevation={3}>
          <Typography component="h1" variant="h5">Change Password</Typography>
          <Box m={0} pt={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new password"
              label="new password"
              type="password"
              id="new-password"
              autoComplete="new-password"
              onChange={(event) => {
                setNewPassword(event.target.value)
              }}
            />
          </Box>
          <Box m={0} pt={0}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm new password"
              label="confirm new password"
              type="password"
              id="confirm-new-password"
              autoComplete="confirm-new-password"
              onChange={(event) => {
                setNewConfirmPassword(event.target.value)
              }}
            />
          </Box>
          <Box m={0} pt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => resetUsersPassword(newPassword, newConfirmPassword, params.code)}
            >
              Send
            </Button>
          </Box>
          <Box m={0} pt={3}>
            <Button
              className={classes.buttonBack}
              color="inherit"
              onClick={() => buttonClick(setVerified, history, setPasswordResetEmail)}
            > Back to Login
            </Button>
          </Box>
        </Paper>
      </div>
      <div>
        <ToastContainer position="bottom-center" autoClose={4000} />
      </div>
    </>
  )
}

export default PwResetForm