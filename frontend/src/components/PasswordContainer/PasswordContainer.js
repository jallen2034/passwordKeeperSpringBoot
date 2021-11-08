import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PasswordEntry from '../PasswordEntry/PasswordEntry'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// styling  component
const useStyles = makeStyles((theme) => ({
  passwordContainer: {
    padding: '25px'
  }
}));

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }

  return result;
}

// implmented a queue to keep track of the most recent and least recent passwords updated by a user
const passwordEditQueue = function(setEditedPasswordFromServer, editedPasswordFromServer, response) {
  const queue = []
  queue.unshift(editedPasswordFromServer[0])
  queue.unshift(response.data)
  setEditedPasswordFromServer(queue)
}

/* callback function after AXIOS call to loop through array of retrieved passwords from the API
 * https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once */
const displayPasswords = function (responseData, setDataFromApi, sessionUuid, setForceRender, deletePassword, editPasssword) {
  const passwordDivsList = []

  responseData.forEach((item, index) => {
    passwordDivsList.push(<Grid item xs={6} md={3}>
      <PasswordEntry
        url={item.url}
        passwordText={item.password_text}
        category={item.category}
        id={item.id}
        name={item.name}
        sessionUuid={sessionUuid}
        deletePassword={deletePassword}
        editPasssword={editPasssword}
        setForceRender={setForceRender}
        passwordEditQueue={passwordEditQueue}
      />
    </Grid>)
  })

  setDataFromApi(passwordDivsList)
}

const deletePassword = function (passwordText, sessionUuid, id, setForceRender, handleClose) {

  axios.post("http://localhost:8080/passwords/delete", { sessionUuid, id, passwordText })
    .then((response) => {
      if (response) {
        toast.success(response.data)
        handleClose()
        setForceRender((prev) => ({ ...prev, value: makeid(5) }))
      }
    }).catch((error) => {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    })
}

const editPasssword = function (passwordText, newPassword, sessionUuid, id, handleSubmitClose, passwordUrl, setEditedPasswordFromServer, editedPasswordFromServer) {

  axios.post("http://localhost:8080/passwords/edit", { sessionUuid, id, passwordText, passwordUrl, newPassword })
    .then((response) => {
      if (response) {
        toast.success(`Sucessfuly edited the old password: ${passwordText} to the new password: ${response.data}`)
        passwordEditQueue(setEditedPasswordFromServer, editedPasswordFromServer, response)
      }
    }).catch((error) => {
      if (error) {
        console.log(error)
      }
    })
}

// https://medium.com/weekly-webtips/force-component-to-re-render-with-hooks-in-react-c57cde48dc9f
function PasswordContainer({ sessionUuid }) {
  const [dataFromApi, setDataFromApi] = useState([])
  const [forceRender, setForceRender] = useState({ value: null })
  const classes = useStyles()

  const retrieveUsersPasswords = function (sessionUuid, setDataFromApi, setForceRender) {

    axios.post("http://localhost:8080/passwords", { sessionUuid })
      .then((response) => {
        if (response) {
          displayPasswords(response.data, setDataFromApi, sessionUuid, setForceRender, deletePassword, editPasssword)
        }
      }).catch((error) => {
        if (error) {
          console.log(error)
        }
      })
  }

  useEffect(() => {
    if (sessionUuid) {
      retrieveUsersPasswords(sessionUuid, setDataFromApi, setForceRender);
    }
  }, [sessionUuid, forceRender.value]);

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