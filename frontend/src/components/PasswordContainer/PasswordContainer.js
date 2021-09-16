import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PasswordEntry from '../PasswordEntry/PasswordEntry'

// dummy data that will be retrieved from the API to show all the personal passwords the current logged in user is looking at
const mockArrPasswordsAPI = [
  {
    "url": "www.reddit.com",
    "password_text": "dlksaj87s",
    "category": "social",
    "id": 3,
    "user_id": 1,
    "organizations_id": 1,
    "name": "Lighthouse Labs"
  },                  
  {
    "url": "www.lighthouselabsadmin.com",
    "password_text": "&h12hs^",
    "category": "work related",
    "id": 2,
    "user_id": 1,
    "organizations_id": 1,
    "name": "Lighthouse Labs"
  }, 
  {
    "url": "www.facebook.com",
    "password_text": "9873masdsa7",
    "category": "social",
    "id": 1,
    "user_id": 1,
    "organizations_id": 1,
    "name": "Lighthouse Labs"
  },              
  {
    "url": "www.amazonworklogin.com",
    "password_text": "09asj2d",
    "category": "work related",
    "id": 4,
    "user_id": 1,
    "organizations_id": 2,
    "name": "Amazon Web Services"
  }
]

// array that we push our collection of passwords to display on
const passwordDivsList = []

// loop through 
mockArrPasswordsAPI.forEach((item, index) => {
  passwordDivsList.push(<PasswordEntry
    url={item.url}
    passwordText={item.password_text}
    category={item.category}
    id={item.id}
    name={item.name}
  />)
})

// styling for this component
const useStyles = makeStyles((theme) => ({
  passwordcontainer: {
    display: 'flex',
    height: '100%',
    color: 'blue'
  },
}))

// component itself
function PasswordContainer() {
  const classes = useStyles()

  return (
    <div className={classes.PasswordContainer}>
      {passwordDivsList}
    </div>
  )
}

export default PasswordContainer