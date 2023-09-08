import React from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Grid from '@material-ui/core/Grid'
import PasswordEntry from '../components/PasswordEntry/PasswordEntry'
import {AppState} from "../app-types";
let generator = require('generate-password')

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length: any) {
  let result = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

// implmented a queue to keep track of the most recent and least recent passwords updated by a user
const passwordEditQueue = function (
  setEditedPasswordFromServer: any,
  editedPasswordFromServer: any,
  response: any
) {
  const queue = []
  queue.unshift(editedPasswordFromServer[0])
  queue.unshift(response.data)
  setEditedPasswordFromServer(queue)
}

const loginUser = function (
  event: any,
  email: any,
  password: any,
  history: any,
  applicationState: AppState,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
) {
  event.preventDefault()

  axios.post("http://localhost:8080/login", { email, password })
    .then((response: any) => {

      if (response.data.enabled === 'true') {
        window.localStorage.setItem('Uuid', response.data.uuid)
        window.localStorage.setItem('enabled', response.data.enabled)
        setApplicationState((prevState: AppState) => ({
          ...prevState,
          currentUserUuid: response.data.uuid,
          enabledUser: true
        }));
        history.push("/vault")
      } else {
        toast.error("Uh oh, doesn't look like you verified your account yet. Please check your email inbox!")
      }
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
}

const registerUser = function (
  event: any,
  email: any,
  password: any,
  passwordConfirm: any
) {
  event.preventDefault()

  axios.post("http://localhost:8080/register", { email, password, passwordConfirm })
    .then((response: any) => {
      toast.success(response.data)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
}

const deletePassword = function (
  passwordText: any,
  sessionUuid: any,
  id: any,
  setForceRender: any,
  handleClose: any
) {

  axios.post("http://localhost:8080/passwords/delete", { sessionUuid, id, passwordText })
    .then((response: any) => {
      if (response) {
        toast.success(response.data)
        handleClose()
        setForceRender((prev: any) => ({ ...prev, value: makeid(5) }))
      }
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
}

/* callback function after AXIOS call to loop through array of retrieved passwords from the API
 * https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once */
const displayPasswords = function (
  responseData: any,
  setDataFromApi: any,
  sessionUuid: any,
  setForceRender: any,
  deletePassword: any,
  editPasssword: any
) {
  const passwordDivsList: any[] = []

  responseData.forEach((item: any, index: any) => {
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
        pwned={item.pwned}
      />
    </Grid>)
  })

  setTimeout(function () { setDataFromApi(passwordDivsList) }, 850)
}

const editPasssword = function (
  passwordText: any,
  newPassword: any,
  sessionUuid: any,
  id: any,
  passwordUrl: any,
  setEditedPasswordFromServer: any,
  editedPasswordFromServer: any,
  setForceRender: any
) {

  axios.post("http://localhost:8080/passwords/edit", { sessionUuid, id, passwordText, passwordUrl, newPassword })
    .then((response: any) => {
      if (response) {
        toast.success(`Sucessfuly edited the old password: ${passwordText} to the new password: ${response.data}`)
        setForceRender((prev: any) => ({ ...prev, value: makeid(5) }))
        passwordEditQueue(setEditedPasswordFromServer, editedPasswordFromServer, response)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const retrieveUsersPasswords = function (
  sessionUuid: any,
  setDataFromApi: any,
  setForceRender: any,
) {

  axios.post("http://localhost:8080/passwords", { sessionUuid })
    .then((response: any) => {
      if (response) {
        displayPasswords(
          response.data,
          setDataFromApi,
          sessionUuid,
          setForceRender,
          deletePassword,
          editPasssword,
        )
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const saveNewPasswrod = function (
  event: any,
  sessionUuid: any,
  passwordText: any,
  category: any,
  url: any
) {
  event.preventDefault()

  if (!passwordText) {
    return toast.error("You can't create an empty password!")
  } else if (!category) {
    return toast.error("You can't create an empty category!")
  } else if (!url) {
    return toast.error("You can't create a password with an empty url!")
  }

  axios.post("http://localhost:8080/passwords/create", { sessionUuid, passwordText, category, url })
    .then((response: any) => {
      if (response) {
        toast.success(response.data)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const saveNewPasswrodForm = function (
  event: any,
  sessionUuid: any,
  category: any,
  url: any,
  sliderValue: any,
  checked: any
) {

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
  })

  axios.post("http://localhost:8080/passwords/create", { sessionUuid, passwordText: password[0], category, url })
    .then((response: any) => {
      if (response) {
        toast.success(response.data)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const verifyUser = function (
  params: any,
  setApplicationState:  React.Dispatch<React.SetStateAction<AppState>>
  ) {
  axios.post("http://localhost:8080/verify", { params })
    .then((response: any) => {
      setApplicationState((prevState: AppState) => ({
        ...prevState,
        verified: response.data
      }));
    }).catch((error) => {
      console.error(error);
    })
}

const sendPasswordResetEmail = function (passwordResetEmail: any) {

  axios.post("http://localhost:8080/resetPasswordSendEmail", { passwordResetEmail })
    .then((response: any) => {
      toast.success(response.data)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
}

const resetUsersPassword = function (
  paramsCode: any,
  applicationState: AppState,
) {

  if (!applicationState.newPassword) {
    toast.error("You can't leave the new password field empty!")
  } else if (!applicationState.newConfirmPassword) {
    toast.error("You can't leave the confirm new password field empty!")
  }

  axios.post("http://localhost:8080/resetUsersPassword", {
    verificationCode: paramsCode,
    newPassword: applicationState.newPassword,
    newPasswordConfirm: applicationState.newConfirmPassword
  })
    .then((response: any) => {
      if (response) {
        toast.success(response.data)
      }
    }).catch((error) => {
      if (error) {
        toast.error(error.response.data.message)
      }
    })
}

const saveNewPassword = function (
  event: any,
  sessionUuid: any,
  passwordText: any,
  category: any,
  url: any,
) {
  if (!passwordText) {
    return toast.error("You can't create an empty password!")
  } else if (!category) {
    return toast.error("You can't create an empty category!")
  }

  axios.post("http://localhost:8080/passwords/create", { sessionUuid, passwordText, category, url })
    .then((response: any) => {
      if (response) {
        toast.success(response.data);
      }
    }).catch((error) => {
    if (error) {
      toast.error(error.response.data.message);
    }
  })
}

const verifyResetFormValid = function (paramsCode: any, setEmailValid: any) {
  axios.post("http://localhost:8080/verifyResetFormValid", { verificationCode: paramsCode })
    .then((response: any) => {
      if (response) {
        response.data ? setEmailValid(true) : setEmailValid(false)
      }
    }).catch((error) => {
      console.error(error);
    })
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
  resetUsersPassword,
  verifyResetFormValid,
  saveNewPassword
}