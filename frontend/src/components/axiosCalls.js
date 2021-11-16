import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Grid from '@material-ui/core/Grid'
import PasswordEntry from './PasswordEntry/PasswordEntry'
let generator = require('generate-password')

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// implmented a queue to keep track of the most recent and least recent passwords updated by a user
const passwordEditQueue = function (setEditedPasswordFromServer, editedPasswordFromServer, response) {
  const queue = []
  queue.unshift(editedPasswordFromServer[0])
  queue.unshift(response.data)
  setEditedPasswordFromServer(queue)
}


const loginUser = function (event, setCurrentUserUuid, email, password, setEnabledUser, currentUserUuid, enabledUser, history) {
  event.preventDefault()

  axios.post("http://localhost:8080/login", { email, password })
    .then((response) => {

      if (response.data.enabled === 'true') {
        window.localStorage.setItem('Uuid', response.data.uuid)
        window.localStorage.setItem('enabled', response.data.enabled)
        setCurrentUserUuid((prev) => ({ ...prev, uuid: response.data.uuid }))
        setEnabledUser((prev) => ({ ...prev, enabled: true }))
        history.push("/vault")
      } else {
        toast.error("Uh oh, doesn't look like you verified your account yet. Please check your email inbox!")
      }
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
}

const registerUser = function (event, setCurrentUserUuid, email, password, passwordConfirm) {
  event.preventDefault()

  axios.post("http://localhost:8080/register", { email, password, passwordConfirm })
    .then((response) => {
      toast.success(response.data)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
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
      toast.error(error.response.data.message)
    })
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
      />
    </Grid>)
  })

  setTimeout(function () { setDataFromApi(passwordDivsList); }, 850);
}

const editPasssword = function (passwordText, newPassword, sessionUuid, id, passwordUrl, setEditedPasswordFromServer, editedPasswordFromServer) {

  axios.post("http://localhost:8080/passwords/edit", { sessionUuid, id, passwordText, passwordUrl, newPassword })
    .then((response) => {
      if (response) {
        toast.success(`Sucessfuly edited the old password: ${passwordText} to the new password: ${response.data}`)
        passwordEditQueue(setEditedPasswordFromServer, editedPasswordFromServer, response)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const retrieveUsersPasswords = function (sessionUuid, setDataFromApi, setForceRender, currentUserUuid) {

  axios.post("http://localhost:8080/passwords", { sessionUuid })
    .then((response) => {
      if (response) {
        displayPasswords(response.data, setDataFromApi, sessionUuid, setForceRender, deletePassword, editPasssword, currentUserUuid)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const saveNewPasswrod = function (event, sessionUuid, passwordText, category, url) {
  event.preventDefault()

  if (!passwordText) {
    return toast.error("You can't create an empty password!")
  } else if (!category) {
    return toast.error("You can't create an empty category!")
  } else if (!url) {
    return toast.error("You can't create a password with an empty url!")
  }

  axios.post("http://localhost:8080/passwords/create", { sessionUuid, passwordText, category, url })
    .then((response) => {
      if (response) {
        toast.success(response.data)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const saveNewPasswrodForm = function (event, sessionUuid, category, url, sliderValue, checked) {

  if (!checked.numbers && !checked.symbols && !checked.lowercas && !checked.uppercase) {
    return toast.error("You can't leave all checkboxes empty when making a password!")
  } else if (!url) {
    return toast.error("You can't create a password with an empty url!")
  }

  const password = generator.generateMultiple(3, {
    length: 20,
    uppercase: checked.uppercase,
    lowercase: checked.lowercase,
    numbers: checked.numbers,
    symbols: checked.symbols
  });

  axios.post("http://localhost:8080/passwords/create", { sessionUuid, passwordText: password[0], category, url })
    .then((response) => {
      if (response) {
        toast.success(response.data)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const verifyUser = function (params, setVerified) {

  axios.post("http://localhost:8080/verify", { params })
    .then((response) => {
      setVerified(response.data)
      return true
    }).catch((error) => {
      return false
    })
}

const sendPasswordResetEmail = function (passwordResetEmail) {

  axios.post("http://localhost:8080/resetPasswordSendEmail", { passwordResetEmail })
    .then((response) => {
      console.log("GOT TO CALL")
    }).catch((error) => {
    })
}

const resetUsersPassword = function (newPassword, newConfirmPassword, paramsCode) {
  console.log("Got to where I want to make my axios call!")
  console.log(newPassword)
  console.log(newConfirmPassword)
  console.log(paramsCode)

  if (!newPassword) {
    return toast.error("You can't leave the new password field empty!")
  } else if (!newConfirmPassword) {
    return toast.error("You can't leave the confirm new password field empty!")
  }


}

export {
  deletePassword,
  displayPasswords,
  editPasssword,
  retrieveUsersPasswords,
  saveNewPasswrod,
  saveNewPasswrodForm,
  loginUser,
  registerUser,
  verifyUser,
  sendPasswordResetEmail,
  resetUsersPassword
}