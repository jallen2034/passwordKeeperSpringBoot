import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-toastify/dist/ReactToastify.css'
import { deletePassword, displayPasswords, editPasssword, retrieveUsersPasswords } from '../axiosCalls.js'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import '@fontsource/roboto';

// styling  component
const useStyles = makeStyles((theme) => ({
  passwordContainer: {
    padding: '25px'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px'
  },
  heading: {
    marginLeft: '50px',
    marginTop: '30px'
  },
  loading: {
  },
}))

// https://medium.com/weekly-webtips/force-component-to-re-render-with-hooks-in-react-c57cde48dc9f
function PasswordContainer({ sessionUuid, enabledUser, currentUserUuid }) {
  const [dataFromApi, setDataFromApi] = useState([])
  const [forceRender, setForceRender] = useState({ value: null })
  const classes = useStyles()

  useEffect(() => {
    if (sessionUuid) {
      retrieveUsersPasswords(sessionUuid, setDataFromApi, setForceRender, currentUserUuid);
    }
  }, [sessionUuid, forceRender.value, enabledUser.enabled]);

  return (
    <>
      <h2 className={classes.heading}> My Saved Passwords </h2>
      {dataFromApi.length > 0
        ?
        <div>
          <Grid container className={classes.passwordContainer}>
            {dataFromApi}
          </Grid>
        </div>
        :
        <div className={classes.root}>
          <div className={classes.loading}>
            <CircularProgress color="secondary" />
          </div>
        </div>
      }
    </>
  )
}

export default PasswordContainer