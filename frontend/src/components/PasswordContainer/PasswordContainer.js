import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PasswordEntry from '../PasswordEntry/PasswordEntry'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styling  component
const useStyles = makeStyles((theme) => ({
  passwordContainer: {
    padding: '25px'
  }
}));

// callback function after AXIOS call to loop through array of retrieved passwords from the API
const displayPasswords = function (responseData, setDataFromApi) {
  const passwordDivsList = []

  responseData.forEach((item, index) => {
    passwordDivsList.push(<Grid item xs={6} md={3}>
      <PasswordEntry
        url={item.url}
        passwordText={item.password_text}
        category={item.category}
        id={item.id}
        name={item.name}
      />
    </Grid>)
  })

  setDataFromApi(passwordDivsList)
}


function PasswordContainer({ sessionUuid }) {
  const [dataFromApi, setDataFromApi] = useState([])
  const classes = useStyles()

  const retrieveUsersPasswords = function (sessionUuid, setDataFromApi) {

    axios.post("http://localhost:8080/passwords", { sessionUuid })
      .then((response) => {
        if (response) {
          displayPasswords(response.data, setDataFromApi)
        }
      }).catch((error) => {
        if (error) {
          console.log(error)
        }
      })
  }

  // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
  useEffect(() => {
    if (sessionUuid) {
      retrieveUsersPasswords(sessionUuid, setDataFromApi);
    }
  }, [sessionUuid]);

  return (
    <>
      {dataFromApi.length > 0
        ? <div><h2>My Saved Passwords</h2>
          <Grid container className={classes.passwordContainer}>
            {dataFromApi}
          </Grid></div>
        : <h2>Loading...</h2>
      }
    </>
  )
}

export default PasswordContainer