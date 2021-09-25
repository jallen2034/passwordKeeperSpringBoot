import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu'; this is broken for some reason TODO - FIX

/* test test
 * for now set the users uuid to null if this functionis called and the current uuid is not null
 * set a hardcoded uuid for when a user logs in (for now) */
const buttonClick = function (setCurrentUserUuid, currentUserUuid) {
  console.log("setCurrentUserUuid in ButtonAppBar component? " + setCurrentUserUuid);

  if(currentUserUuid) {
    setCurrentUserUuid((prev) => ({ ...prev, uuid: null }));
  } else {
    setCurrentUserUuid((prev) => ({ ...prev, uuid: 4321 }));
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

function ButtonAppBar({ setCurrentUserUuid, currentUserUuid, register }) {
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
            PasswordKepper logged in
          </Typography>
          {(() => {
            if (!currentUserUuid && !register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid)}
                > Register
                </Button>
              )
            } else if (!currentUserUuid && !register) {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid)}
                > Login
                </Button>
              )
            } else {
              return (
                <Button
                  color="inherit"
                  onClick={() => buttonClick(setCurrentUserUuid, currentUserUuid)}
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