import React, {useEffect} from "react";
import { useParams, Redirect } from "react-router-dom"
import { Button, Typography } from '@material-ui/core'
import { verifyUser } from '../../network-requests/axiosCalls'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import {AppState} from "../../app-types";
import '@fontsource/roboto/300.css'

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
      height: theme.spacing(10),
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

type VerificationPageProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

const buttonClick = function (
  history: any,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
) {
  setApplicationState((prevState: AppState) => ({
    ...prevState,
    verified: null,
    passwordResetEmail: null
  }));
  history.push("/login");
}

// https://www.youtube.com/watch?v=y_pr4lRoUto
function VerificationPage(props: VerificationPageProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;
  const classes: any = useStyles()
  const params: any = useParams()

  // useEffect(() => {
  //   if (!applicationState.verified) {
  //     verifyUser(params.code, setApplicationState)
  //   }
  // }, []);

  if (params) {
    return (
      <>
        <div className={classes.root}>
          <Paper elevation={3}>
            {applicationState.verified
              ?
              <Typography component="h1">
                {applicationState.verified}
              </Typography>
              :
              <div>
                <CircularProgress color="secondary" />
              </div>}
            <Box m={0} pt={3}>
              <Button
                className={classes.buttonBack}
                color="inherit"
                onClick={() => buttonClick(
                  history,
                  setApplicationState
                )}
              > Go Back to Login
              </Button>
            </Box>
          </Paper>
        </div>
      </>
    )
  } else if (applicationState.currentUserUuid || applicationState.enabledUser) {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

export default VerificationPage