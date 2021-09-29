import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Select, TextField, FormControl, Slider, Grid, Checkbox, FormControlLabel } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

// mock data from API for the current organizations the user is a part of
const usersOrganizations = [
  { "name": "Amazon Web Services" },
  { "name": "Lighthouse Labs" },
  { "name": "Google" },
  { "name": "Microsoft" }
]

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
}));

function PasswordForm() {
  const classes = useStyles();
  const [selectedOrg, setSelectedOrg] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [urlText, setUrlText] = useState('')
  const [sliderValue, setSliderValue] = useState('')
  const [checked, setChecked] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  })

  const handleOrgChange = (event) => {
    setSelectedOrg(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleCheckChange = (event) => {
    console.log("event.target.checked: ", event.target.checked)
    setChecked({...checked, [event.target.name]: event.target.checked})
  }

  const onChange = (event) => {
    setUrlText(event.target.value)
  }

  function valuetext(value) {
    setSliderValue(value)
    return { value };
  }

  return (
    <div>
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
        Length:
        <Slider
          defaultValue={30}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={5}
          marks
          min={10}
          max={50}
        />
        Properties:
        <Grid container className={classes.passwordContainer}>
          <Grid item xs={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox checked={checked.uppercase} onChange={handleCheckChange} name="uppercase" />
              }
              label="Uppercase"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox checked={checked.lowercase} onChange={handleCheckChange} name="lowercase" />
              }
              label="Lowercase"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox checked={checked.numbers} onChange={handleCheckChange} name="numbers" />
              }
              label="Numbers"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox checked={checked.symbols} onChange={handleCheckChange} name="symbols" />
              }
              label="Symbols"
            />
          </Grid>
        </Grid>
        <Button>Generate Password</Button>
      </FormControl>
    </div>
  )
}

export default PasswordForm;