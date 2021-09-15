import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu'; this is broken for some reason TODO - FIX

// test test
const buttonClick = function (setCurrentUserUuid) {
  console.log("setCurrentUserUuid in ButtonAppBar component? " + setCurrentUserUuid);
  setCurrentUserUuid((prev) => ({ ...prev, uuid: null }));
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

function ButtonAppBar({ setCurrentUserUuid }) {
  const classes = useStyles();

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
          <Button
            color="inherit"
            onClick={() => buttonClick(setCurrentUserUuid)}
          > Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;