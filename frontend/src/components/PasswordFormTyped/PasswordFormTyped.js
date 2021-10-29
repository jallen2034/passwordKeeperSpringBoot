import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Button, Select, TextField, FormControl, MenuItem } from '@material-ui/core'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  "Social",
  "Work Related",
  "Entertainment"
]

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: '#c7c7c7',
    display: 'flex',
    flexDirection: "column",
    width: '750px'
  }
}));

const saveNewPasswrod = function (event, sessionUuid, passwordText, category, url) {
  console.log("passwordText in button click function called!")

  axios.post("http://localhost:8080/passwords/create", { sessionUuid, passwordText, category, url })
  .then((response) => {
    if (response) {
      console.log(response.data)
      toast.success(response.data)
    }
  }).catch((error) => {
    if (error) {
      console.log(error)
    }
  })
}

function PasswordFormTyped({ sessionUuid }) {
  const classes = useStyles();
  const [category, setCategory] = useState('')
  const [url, setUrl] = useState('')
  const [passwordText, setPasswordText] = useState('')

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const onChange = (event) => {
    setUrl(event.target.value)
  }

  const onPasswordTextChange = (event) => {
    setPasswordText(event.target.value)
  }

  return (
    <div className={classes.divContainer}>
      <FormControl className={classes.formControl}>
        Url:
        <TextField
          urlText={url}
          onChange={onChange}
        />
        Category:
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((data, id) => {
            return <MenuItem value={data}>{data}</MenuItem>
          })}
        </Select>
        Password text:
        <TextField
          passwordText={passwordText}
          onChange={onPasswordTextChange}
        />
        <Button onClick={(event) => saveNewPasswrod(event, sessionUuid, passwordText, category, url)}>Generate Password</Button>
      </FormControl>
    </div>
  )
}

export default PasswordFormTyped;