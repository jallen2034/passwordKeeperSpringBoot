import { Button, Typography } from '@material-ui/core'
import { ToastContainer } from "react-toastify"
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { sendPasswordResetEmail } from '../../network-requests/axiosCalls'
import { makeStyles } from '@material-ui/core/styles'
import '@fontsource/roboto/300.css'
import {AppState} from "../../App";
import React from "react";

// https://stackoverflow.com/questions/60969224/how-to-override-muipaper-root-style-in-material-table
const useStyles = makeStyles((theme) => ({
  root: {
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
      height: theme.spacing(46),
    },
    "& .MuiPaper-root": {
      paddingTop: "35px",
      paddingLeft: "45px",
      paddingRight: "45px",
      paddingBottom: "45px",
    },
  },
  buttonBack: {
    backgroundColor: "#ebebeb",
    '&:hover': {
      backgroundColor: "#96d3dd",
    },
  },
}))

const buttonClick = function (
  history: any,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
) {
  setApplicationState((prevState: AppState) => ({
    ...prevState,
    verified: null,
    passwordResetEmail: null
  }));
  history.push("/login")
}

type PasswordResetPageProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function PwResetPage(props: PasswordResetPageProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  const classes: any = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={3}>
          <Typography component="h1" variant="subtitle1">
            Forgot your password? Enter your email address and you will receive a
            link to create a new password via email if an account exists for it.
          </Typography>
          <Box m={0} pt={2}>
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
                setApplicationState((prevState: AppState) => ({
                  ...prevState,
                  verified: null
                }));
              }}
            />
          </Box>
          <Box m={0} pt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => sendPasswordResetEmail(applicationState.passwordResetEmail)}
            >
              Reset Password
            </Button>
          </Box>
          <Box m={0} pt={3}>
            <Button
              className={classes.buttonBack}
              color="inherit"
              onClick={() => buttonClick(
                history,
                setApplicationState
              )}
            >
              Back to Login
            </Button>
          </Box>
          <div>
            <ToastContainer position="bottom-center" autoClose={4000} />
          </div>
        </Paper>
      </div>
    </>
  )
}

export default PwResetPage