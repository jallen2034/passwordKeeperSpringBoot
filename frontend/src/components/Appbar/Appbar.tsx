import React from "react";
import {Button, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core'
import {buttonClick, buttons, createButton} from "./helpers";
import {ButtonAppBarProps} from "./app-bar-types";
import {useStyles} from "./app-bar-styles";

function ButtonAppBar(props: ButtonAppBarProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  const classes: any = useStyles();
  let switcherButton: any;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PasswordKeeper
          </Typography>

          {/* Render the Register button in appbar */}
          {!applicationState.currentUserUuid && !applicationState.register && (
            <Button
              color="inherit"
              onClick={() => buttonClick(
                switcherButton = "default",
                history,
                applicationState,
                setApplicationState,
              )}
            >
              Register
            </Button>
          )}
          {/* Render the Login button in appbar */}
          {!applicationState.currentUserUuid && applicationState.register && (
            <Button
              color="inherit"
              onClick={() => buttonClick(
                switcherButton = "default",
                history,
                applicationState,
                setApplicationState,
              )}
            >
              Login
            </Button>
          )}
          {/* Render all other buttons in the appbar */}
          {applicationState.currentUserUuid && (
            <>
              {buttons.map((button, index) => (
                <div key={index}>
                  {createButton(button.label, () =>
                    buttonClick(button.switcherButton, history, applicationState, setApplicationState)
                  )}
                </div>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default ButtonAppBar