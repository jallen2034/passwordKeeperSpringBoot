import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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