import React, {useEffect} from "react";
import { useParams, Redirect } from "react-router-dom"
import { Button, Typography } from '@material-ui/core'
import { verifyUser } from '../../network-requests/axiosCalls'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import {VerificationPageProps} from "./Verification-page-types";
import { useStyles } from "./Verification-page-styles";
import {buttonClick} from "./Verification-page-helpers";
import '@fontsource/roboto/300.css'

// This is the page the user lands ont o verify their account after they register and have to click on the email link to verify their account
function VerificationPage(props: VerificationPageProps) {
  const { history, applicationState, setApplicationState } = props;
  const classes: any = useStyles();
  const params: any = useParams();

  // Hit Spring Boot backend to verify the user when this page mounts once.
  useEffect(() => {
    if (!applicationState.verified) {
      verifyUser(params.code, setApplicationState);
    }
  }, []);

  if (params) {
    return (
      <>
        <div className={classes.root}>
          <Paper elevation={3}>
            {applicationState.verified
              ?
              <Typography component="h1">
                {applicationState.verified}
              </Typography>
              :
              <div>
                <CircularProgress color="secondary" />
              </div>}
            <Box m={0} pt={3}>
              <Button
                className={classes.buttonBack}
                color="inherit"
                onClick={() => buttonClick(history, setApplicationState)}
              > Go Back to Login
              </Button>
            </Box>
          </Paper>
        </div>
      </>
    )
  } else if (applicationState.currentUserUuid || applicationState.enabledUser) {
    return (
      <Redirect to={{ pathname: '/vault' }} />
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
}

export default VerificationPage