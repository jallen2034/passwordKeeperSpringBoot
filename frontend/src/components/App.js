// this is a copy of the app component purely for storybook.
import { useState, useEffect } from "react"
import ButtonAppBar from "./Appbar/Appbar"
import { Button, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
import SignIn from "./Login/Login"
import Register from "./Register/Register"
import PasswordVault from "./PasswordVault/PasswordVault"
import { ToastContainer, toast } from "react-toastify"
import { BrowserRouter as Router, Route, Switch, useHistory, useParams, Redirect } from "react-router-dom"
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { verifyUser, sendPasswordResetEmail, resetUsersPassword } from './axiosCalls'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(60),
      height: theme.spacing(38),
    },
  },
}))

const buttonClick = function (setVerified, history, setPasswordResetEmail) {
  setVerified(null)
  setPasswordResetEmail(null)
  history.push("/login")
}

function PwResetForm({ verified, setVerified, newPassword, setNewPassword, newConfirmPassword, setNewConfirmPassword, history, setPasswordResetEmail }) {
  const classes = useStyles()
  const params = useParams()
  console.log("VERIFIED!")
  console.log(verified)

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={3}>
          <h4>Change Password</h4>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new password"
            label="new password"
            type="new password"
            id="new-password"
            autoComplete="new-password"
            onChange={(event) => {
              setNewPassword(event.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm new password"
            label="confirm new password"
            type="confirm new password"
            id="confirm-new-password"
            autoComplete="confirm-new-password"
            onChange={(event) => {
              setNewConfirmPassword(event.target.value)
            }}
          />
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
          <Button
            color="inherit"
            onClick={() => buttonClick(setVerified, history, setPasswordResetEmail)}
          > Go Back to Login
          </Button>
        </Paper>
      </div>
    </>
  )
}

function PwResetPage({ setVerified, history, setPasswordResetEmail, passwordResetEmail }) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={3}>
          <h4>Forgot your password? Please enter your username or email address. You will receive a link to create a new password via email if an account exists for it.</h4>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email address"
            label="email address"
            type="email address"
            id="email-address"
            autoComplete="current-password"
            onChange={(event) => {
              setPasswordResetEmail(event.target.value)
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => sendPasswordResetEmail(passwordResetEmail)}
          >
            Reset Password
          </Button>
          <Button
            color="inherit"
            onClick={() => buttonClick(setVerified, history, setPasswordResetEmail)}
          > Go Back to Login
          </Button>
        </Paper>
      </div>
    </>
  )
}

// https://www.youtube.com/watch?v=y_pr4lRoUto
function VerificationPage({ verified, setVerified, history, sessionUuid, enabled }) {
  const params = useParams()

  if (!verified) {
    verifyUser(params.code, setVerified)
  }

  if (params) {
    return (
      <>
        <div className="App">
          {verified
            ?
            <h1>
              {verified}
            </h1>
            :
            <div>
              <CircularProgress color="secondary" />
            </div>}
          <Button
            color="inherit"
            onClick={() => buttonClick(setVerified, history)}
          > Go Back to Login
          </Button>
        </div>
      </>
    )
  } else if (sessionUuid, enabled) {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

function LoginPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, history, setEnabledUser, sessionUuid, enabled, enabledUser, setVerified }) {
  setVerified(null)

  if (!enabled && !sessionUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
            setEnabledUser={setEnabledUser}
          />
          <SignIn
            setCurrentUserUuid={setCurrentUserUuid}
            setEnabledUser={setEnabledUser}
            currentUserUuid={currentUserUuid}
            enabledUser={enabledUser}
            history={history}
          />
        </div>
        <div>
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      </>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  }
}

function RegisterPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, history, enabled, sessionUuid }) {
  if (!enabled && !sessionUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
          />
          <Register setCurrentUserUuid={setCurrentUserUuid}></Register>
        </div>
        <div>
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      </>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  }
}

function VaultPage({ setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, indexSelected, history, setEnabledUser, enabledUser, sessionUuid, enabled }) {

  if (enabled && sessionUuid) {
    return (
      <>
        <div className="App">
          <ButtonAppBar
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            setIndexSelected={setIndexSelected}
            history={history}
            setEnabledUser={setEnabledUser}
          />
          <PasswordVault
            indexSelected={indexSelected}
            sessionUuid={currentUserUuid.uuid}
            enabledUser={enabledUser}
            currentUserUuid={currentUserUuid}
          ></PasswordVault>
        </div>
        <div>
          <ToastContainer position="bottom-center" autoClose={4000} />
        </div>
      </>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

function App() {
  const history = useHistory()
  const sessionUuid = window.localStorage.getItem("Uuid")
  const enabled = window.localStorage.getItem("enabled")
  const [register, setRegister] = useState(false)
  const [verified, setVerified] = useState(null)
  const [passwordResetEmail, setPasswordResetEmail] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [newConfirmPassword, setNewConfirmPassword] = useState(null)
  const [indexSelected, setIndexSelected] = useState(true)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null
  })

  const [enabledUser, setEnabledUser] = useState({
    enabled: enabled || null
  })

  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
            setEnabledUser={setEnabledUser}
            sessionUuid={sessionUuid}
            enabled={enabled}
            enabledUser={enabledUser}
            setVerified={setVerified}
          />
        </Route>
        <Route path="/register">
          <RegisterPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            history={history}
            sessionUuid={sessionUuid}
            enabled={enabled}
          />
        </Route>
        <Route path="/vault">
          <VaultPage
            setCurrentUserUuid={setCurrentUserUuid}
            currentUserUuid={currentUserUuid}
            register={register}
            setRegister={setRegister}
            setIndexSelected={setIndexSelected}
            indexSelected={indexSelected}
            history={history}
            setEnabledUser={setEnabledUser}
            enabledUser={enabledUser}
            sessionUuid={sessionUuid}
            enabled={enabled}
          />
        </Route>
        <Route path="/verify:code">
          <VerificationPage
            verified={verified}
            setVerified={setVerified}
            history={history}
            sessionUuid={sessionUuid}
            enabled={enabled}
          />
        </Route>
        <Route path="/resetPassword">
          <PwResetPage
            setVerified={setVerified}
            history={history}
            setPasswordResetEmail={setPasswordResetEmail}
            passwordResetEmail={passwordResetEmail}
          />
        </Route>
        <Route path="/resetPasswordForm:code">
          <PwResetForm
            verified={verified}
            setVerified={setVerified}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newConfirmPassword={newConfirmPassword}
            setNewConfirmPassword={setNewConfirmPassword}
            history={history}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App;
