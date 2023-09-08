import React, {ChangeEvent, FormEvent, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useStyles} from "./register-styles";
import {Copyright} from "../Copyright/Copyright";
import {RegisterForm} from "./register-types";
import {handleInputChange, handleSubmit} from "./register-helpers";
import 'react-toastify/dist/ReactToastify.css';

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
function Register() {
  const classes = useStyles();

  // State variables for the Register form
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  // Desctructure the state variables for readability :))
  const { email, password, passwordConfirm } = registerForm;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(
            event,
            email,
            password,
            passwordConfirm
          )}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleInputChange(
                event, setRegisterForm
              )}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleInputChange(
                event, setRegisterForm
              )}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              autoComplete="confirm-current-password"
              value={passwordConfirm}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleInputChange(
                event, setRegisterForm
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Register;