import { useState } from 'react';
import { Button, Select, TextField, FormControl, MenuItem } from '@material-ui/core';
import {saveNewPassword} from "../../network-requests/axiosCalls";
import {useStyles} from "./Password-form-typed-styles";
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  "Social",
  "Work Related",
  "Entertainment"
]

function PasswordFormTyped({ sessionUuid }) {
  const classes = useStyles();

  // Pass form typed state
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
        <Button onClick={(event) => saveNewPassword(
          event,
          sessionUuid,
          passwordText,
          category,
          url
        )}>Generate Password</Button>
      </FormControl>
    </div>
  )
}

export default PasswordFormTyped