import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PasswordEntry from '../PasswordEntry/PasswordEntry'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// dummy data that will be retrieved from the API to show all the personal passwords the current logged in user is looking at
const mockArrPasswordsAPI = [
  {
    "url": "www.disneyplus.com",
    "password_text": "kjhsa8h&",
    "category": "entertainment",
    "id": 11,
    "user_id": 4,
    "organisations_id": 1,
    "name": "Lighthouse Labs"
  },
  {
    "url": "www.reddit.com",
    "password_text": "dlksaj87s",
    "category": "social",
    "id": 3,
    "user_id": 1,
    "organisations_id": 1,
    "name": "Lighthouse Labs"
  },
  {
    "url": "www.lighthouselabsadmin.com",
    "password_text": "&h12hs^",
    "category": "work related",
    "id": 2,
    "user_id": 1,
    "organisations_id": 1,
    "name": "Lighthouse Labs"
  },
  {
    "url": "www.facebook.com",
    "password_text": "9873masdsa7",
    "category": "social",
    "id": 1,
    "user_id": 1,
    "organisations_id": 1,
    "name": "Lighthouse Labs"
  },
  {
    "url": "www.netflix.com",
    "password_text": "lhsafua",
    "category": "entertainment",
    "id": 13,
    "user_id": 4,
    "organisations_id": 2,
    "name": "Amazon Web Services"
  },
  {
    "url": "www.twitter.com",
    "password_text": "uiha78s68aj",
    "category": "social",
    "id": 12,
    "user_id": 4,
    "organisations_id": 2,
    "name": "Amazon Web Services"
  },
  {
    "url": "www.amazonworklogin.com",
    "password_text": "09asj2d",
    "category": "work related",
    "id": 4,
    "user_id": 1,
    "organisations_id": 2,
    "name": "Amazon Web Services"
  }
]

// styling  component
const useStyles = makeStyles((theme) => ({
  passwordContainer: {
    padding: '25px'
  }
}));

// arrays we push our collection of passwords to display on
const passwordDivsList = []
const passwordCompanyDivsList = []

// loop through array of retrieved passwords from the API
mockArrPasswordsAPI.forEach((item, index) => {

  // hardcoded user id for now, this will later change to be dynamic on user login (usestate)
  if (item.user_id === 1) {
    passwordDivsList.push(<Grid item xs={6} md={3}>
      <PasswordEntry
        url={item.url}
        passwordText={item.password_text}
        category={item.category}
        id={item.id}
        name={item.name}
      />
    </Grid>)
  } else {
    passwordCompanyDivsList.push(<Grid item xs={6} md={3}>
      <PasswordEntry
        url={item.url}
        passwordText={item.password_text}
        category={item.category}
        id={item.id}
        name={item.name}
      />
    </Grid>)
  }
})

function PasswordContainer({ sessionUuid }) {
  const classes = useStyles()
  const retrieveUsersPasswords = function (sessionUuid) {
    console.log(sessionUuid)

    axios.post("http://localhost:8080/passwords", { sessionUuid })
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }

  // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
  useEffect(() => {
    if (sessionUuid) {
      retrieveUsersPasswords(sessionUuid);
    }
  }, []);

  return (
    <>
      <h2>My Passwords - Also shared by your companies</h2>
      <Grid container className={classes.passwordContainer}>
        {passwordDivsList}
      </Grid>
      <h2>All Company Passwords - Created by other users</h2>
      <Grid container className={classes.passwordContainer}>
        {passwordCompanyDivsList}
      </Grid>
    </>
  )
}

export default PasswordContainer