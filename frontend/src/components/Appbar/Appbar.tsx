import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
import {AppState} from "../App";
import React from "react";

const handleRegisterStateChange = (
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>,
  value: boolean
) => {
  setApplicationState((prevState: AppState) => ({
    ...prevState,
    register: value
  }));
}

const handleIndexSelectedChange = (
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>,
  value: boolean
) => {
  setApplicationState((prevState: AppState) => ({
    ...prevState,
    indexSelected: value
  }));
}

const buttonClick = function (
  switcherButton: any,
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
) {

  switch (switcherButton) {
    case "view":
      handleIndexSelectedChange(setApplicationState, true);
      break
    case "create":
      handleIndexSelectedChange(setApplicationState, false);
      break
    default:

      if (!applicationState.register) {
        handleRegisterStateChange(setApplicationState, true);
        history.push("/register")
      } else if (applicationState.register) {
        handleRegisterStateChange(setApplicationState, false);
        history.push("/login")
      }

      if (applicationState.currentUserUuid) {
        window.localStorage.removeItem('Uuid')
        window.localStorage.removeItem('enabled')
        handleRegisterStateChange(setApplicationState, false);
        setApplicationState((prevState: AppState) => ({
          ...prevState,
          currentUserUuid: null,
          enabledUser: null
        }));
        history.push("/login")
      }
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}))

type ButtonAppBarProps = {
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function ButtonAppBar(props: ButtonAppBarProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  const classes: any = useStyles();
  let switcherButton: any;

  // for storybook testing of this component only
  if (!applicationState.currentUserUuid && !applicationState.register) {
    setApplicationState((prevState: AppState) => ({
      ...prevState,
      register: true,
      currentUserUuid: null
    }));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PasswordKeeper
          </Typography>
          {(() => {
            if (!applicationState.currentUserUuid && !applicationState.register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(
                    switcherButton = "default",
                    history,
                    applicationState,
                    setApplicationState,
                  )}
                > Register
                </Button>
              )
            } else if (!applicationState.currentUserUuid && applicationState.register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(
                    switcherButton = "default",
                    history,
                    applicationState,
                    setApplicationState,
                  )}
                > Login
                </Button>
              )
            } else {
              return (
                <>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(
                      switcherButton = "view",
                      history,
                      applicationState,
                      setApplicationState,
                    )}
                  > View Passwords
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(
                      switcherButton = "create",
                      history,
                      applicationState,
                      setApplicationState,
                    )}
                  > Create New Password
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(
                      switcherButton = "default",
                      history,
                      applicationState,
                      setApplicationState,
                    )}
                  > Logout
                  </Button>
                </>
              )
            }
          })()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default ButtonAppBar