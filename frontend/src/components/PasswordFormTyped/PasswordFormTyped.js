import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Select, TextField, FormControl, MenuItem } from '@material-ui/core'

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

function PasswordFormTyped() {
  const classes = useStyles();
  const [selectedOrg, setSelectedOrg] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [urlText, setUrlText] = useState('')
  const [passwordText, setPasswordText] = useState('')

  const handleOrgChange = (event) => {
    setSelectedOrg(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const onChange = (event) => {
    setUrlText(event.target.value)
  }

  const onPasswordTextChange = (event) => {
    setPasswordText(event.target.value)
  }

  return (
    <div className={classes.divContainer}>
      <FormControl className={classes.formControl}>
        Organization:
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOrg}
          onChange={handleOrgChange}
        >
          {usersOrganizations.map((data, id) => {
            return <MenuItem value={data.name}>{data.name}</MenuItem>
          })}
        </Select>
        Url:
        <TextField
          urlText={urlText}
          onChange={onChange}
        />
        Category:
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
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
        <Button>Generate Password</Button>
      </FormControl>
    </div>
  )
}

export default PasswordFormTyped;