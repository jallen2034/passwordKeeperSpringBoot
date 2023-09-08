import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  divContainer: {
    padding: '25px',
    borderRadius: '15px',
    backgroundColor: '#e9ecef',
    display: 'flex',
    flexDirection: "column",
    width: '750px'
  }
}))