import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
import {AppState} from "../App";
import React from "react";

const buttonClick = function (
  setCurrentUserUuid: any,
  currentUserUuid: any,
  register: any,
  setRegister: any,
  setIndexSelected: any,
  switcherButton: any,
  history: any,
  setEnabledUser: any
) {

  switch (switcherButton) {
    case "view":
      setIndexSelected(true)
      break
    case "create":
      setIndexSelected(false)
      break
    default:

      if (!register) {
        setRegister(true)
        history.push("/register")
      } else if (register) {
        setRegister(false)
        history.push("/login")
      }

      if (currentUserUuid.uuid) {
        setCurrentUserUuid((prev: any) => ({ ...prev, uuid: null }))
        window.localStorage.removeItem('Uuid')
        window.localStorage.removeItem('enabled')
        setRegister(false)
        setEnabledUser((prev: any) => ({ ...prev, enabled: null }))
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
  setCurrentUserUuid: any,
  currentUserUuid: any,
  register: any,
  setRegister: any,
  setIndexSelected?: any,
  history: any,
  setEnabledUser: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
}

function ButtonAppBar(props: ButtonAppBarProps) {
  const {
    setCurrentUserUuid,
    currentUserUuid,
    register,
    setRegister,
    setIndexSelected,
    history,
    setEnabledUser
  } = props;


  const classes = useStyles()
  let switcherButton

  // for storybook testing of this component only
  if (!currentUserUuid && !register) {
    setCurrentUserUuid(false);
    setRegister(true);
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
            if (!currentUserUuid.uuid && !register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(
                    setCurrentUserUuid,
                    currentUserUuid,
                    register,
                    setRegister,
                    setIndexSelected,
                    switcherButton = "default",
                    history,
                    setEnabledUser
                  )}
                > Register
                </Button>
              )
            } else if (!currentUserUuid.uuid && register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(
                    setCurrentUserUuid,
                    currentUserUuid,
                    register,
                    setRegister,
                    setIndexSelected,
                    switcherButton = "default",
                    history,
                    setEnabledUser
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
                      setCurrentUserUuid,
                      currentUserUuid,
                      register,
                      setRegister,
                      setIndexSelected,
                      switcherButton = "view",
                      history,
                      setEnabledUser
                    )}
                  > View Passwords
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(
                      setCurrentUserUuid,
                      currentUserUuid,
                      register,
                      setRegister,
                      setIndexSelected,
                      switcherButton = "create",
                      history,
                      setEnabledUser
                    )}
                  > Create New Password
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(
                      setCurrentUserUuid,
                      currentUserUuid,
                      register,
                      setRegister,
                      setIndexSelected,
                      switcherButton = "default",
                      history,
                      setEnabledUser
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