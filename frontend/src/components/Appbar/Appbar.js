import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'; this is broken for some reason TODO - FIX

/* test test
 * for now set the users uuid to null if this functionis called and the current uuid is not null
 * set a hardcoded uuid for when a user logs in (for now) */
const buttonClick = function (setCurrentUserUuid, currentUserUuid, register, setRegister) {

  if (!register) {
    setRegister(true)
  } else if (register) {
    setRegister(false)
  }

  if (currentUserUuid.uuid) {
    setCurrentUserUuid((prev) => ({ ...prev, uuid: null }))
    window.localStorage.removeItem('Uuid')
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

function ButtonAppBar({ setCurrentUserUuid, currentUserUuid, register, setRegister }) {
  const classes = useStyles();

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
            PasswordKepper
          </Typography>
          {(() => {
            if (!currentUserUuid.uuid && !register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister)}
                > Register
                </Button>
              )
            } else if (!currentUserUuid.uuid && register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister)}
                > Login
                </Button>
              )
            } else {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid, register, setRegister)}
                > Logout
                </Button>
              )
            }
          })()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;