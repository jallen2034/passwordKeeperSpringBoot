import React, {ChangeEvent, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {loginUser} from "../../network-requests/axiosCalls";
import Typography from '@material-ui/core/Typography';
import {SignInProps} from "./login-types";
import {useStyles} from "./login-styles";
import {openResetPasswordPage} from "./helpers";
import {Copyright} from "../Copyright";
import 'react-toastify/dist/ReactToastify.css';

function SignIn(props: SignInProps) {
  const {
    history,
    applicationState,
    setApplicationState
  } = props;

  const classes = useStyles()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline/>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
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
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setEmail(event.target.value)
              }}
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
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setPassword(event.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event: any) => loginUser(
                event,
                email,
                password,
                history,
                applicationState,
                setApplicationState
              )}
            >
              Sign In
            </Button>
            <Link
              variant="body2"
              onClick={() => openResetPasswordPage(history)}
            >
              {"Forgot password?"}
            </Link>
            <Box mt={5}>
              <Copyright/>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignIn