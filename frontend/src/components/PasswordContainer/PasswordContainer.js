import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-toastify/dist/ReactToastify.css'
import { deletePassword, displayPasswords, editPasssword, retrieveUsersPasswords } from '../axiosCalls.js'
import Grid from '@material-ui/core/Grid'

// styling  component
const useStyles = makeStyles((theme) => ({
  passwordContainer: {
    padding: '25px'
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

// https://medium.com/weekly-webtips/force-component-to-re-render-with-hooks-in-react-c57cde48dc9f
function PasswordContainer({ sessionUuid }) {
  const [dataFromApi, setDataFromApi] = useState([])
  const [forceRender, setForceRender] = useState({ value: null })
  const classes = useStyles()

  useEffect(() => {
    if (sessionUuid) {
      retrieveUsersPasswords(sessionUuid, setDataFromApi, setForceRender);
    }
  }, [sessionUuid, forceRender.value]);

  return (
    <>
      {dataFromApi.length > 0
        ? 
        <div>
          <h2>My Saved Passwords</h2>
          <Grid container className={classes.passwordContainer}>
            {dataFromApi}
          </Grid>
        </div>
        : 
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      }
    </>
  )
}

export default PasswordContainer