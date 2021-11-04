import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { saveNewPasswrodForm } from '../axiosCalls.js'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Select,
  TextField,
  FormControl,
  Slider,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem
} from '@material-ui/core'

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

function PasswordForm({ sessionUuid }) {
  const classes = useStyles();
  const [category, setCategory] = useState('')
  const [url, setUrl] = useState('')
  const [sliderValue, setSliderValue] = useState('')
  const [checked, setChecked] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  })

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleCheckChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  }

  const onChange = (event) => {
    setUrl(event.target.value)
  }

  function valuetext(value) {
    setSliderValue(value)
    return { value };
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
        <Button onClick={(event) => saveNewPasswrodForm(event, sessionUuid, category, url, sliderValue, checked)} >Generate Password</Button>
      </FormControl>
    </div>
  )
}

export default PasswordForm;