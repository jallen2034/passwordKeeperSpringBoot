import { useParams, Redirect } from "react-router-dom"
import { Button } from '@material-ui/core'
import { verifyUser } from '../axiosCalls'
import CircularProgress from '@material-ui/core/CircularProgress'
import '@fontsource/roboto/300.css'

const buttonClick = function (setVerified, history, setPasswordResetEmail) {
  setVerified(null)
  setPasswordResetEmail(null)
  history.push("/login")
}

// https://www.youtube.com/watch?v=y_pr4lRoUto
function VerificationPage({ verified, setVerified, history, sessionUuid, enabled }) {
  const params = useParams()

  if (!verified) {
    verifyUser(params.code, setVerified)
  }

  if (params) {
    return (
      <>
        <div className="App">
          {verified
            ?
            <h1>
              {verified}
            </h1>
            :
            <div>
              <CircularProgress color="secondary" />
            </div>}
          <Button
            color="inherit"
            onClick={() => buttonClick(setVerified, history)}
          > Go Back to Login
          </Button>
        </div>
      </>
    )
  } else if (sessionUuid, enabled) {
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