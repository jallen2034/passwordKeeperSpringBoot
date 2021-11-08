import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from "react-router-dom";
// import MenuIcon from '@material-ui/icons/Menu'; this is broken for some reason TODO - FIX

/* test test
 * for now set the users uuid to null if this functionis called and the current uuid is not null
 * set a hardcoded uuid for when a user logs in (for now)
 * this is currently a really sucky implementation and needs refactoring */
const buttonClick = function (setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, switcherButton, history) {

  switch (switcherButton) {
    case "view":
      setIndexSelected(true)
      break;
    case "create":
      setIndexSelected(false)
      break;
    default:

      console.log("register before")
      console.log(register)

      if (!register) {
        setRegister(true)
        history.push("/register")
      } else if (register) {
        setRegister(false)
        history.push("/login")
      }

      if (currentUserUuid.uuid) {
        setCurrentUserUuid((prev) => ({ ...prev, uuid: null }))
        window.localStorage.removeItem('Uuid')
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
}));

function ButtonAppBar({ setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, history }) {
  const classes = useStyles();
  let switcherButton;
  console.log("HISTORY")
  console.log(history)

  // for storybook testing of this component - hardcoed values - will be removed later when developing actual react app
  if (!currentUserUuid && !register) {
    currentUserUuid = false
    register = true
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> this is broken for some reason TODO - FIX */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PasswordKeeper
          </Typography>
          {(() => {
            if (!currentUserUuid.uuid && !register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, switcherButton = "default", history)}
                > Register
                </Button>
              )
            } else if (!currentUserUuid.uuid && register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, switcherButton = "default", history)}
                > Login
                </Button>
              )
            } else {
              return (
                <>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, switcherButton = "view", history)}
                  > View Passwords
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, switcherButton = "create", history)}
                  > Create New Password
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister, setIndexSelected, switcherButton = "default", history)}
                  > Logout
                  </Button>
                </>
              )
            }
          })()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;