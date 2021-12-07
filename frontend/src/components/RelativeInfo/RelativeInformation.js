import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  alert: {
    borderRadius: '7px',
    marginBottom: '15px',
    fontSize: "12px",
    maxWidth: "200px"
  },
}))


function RelativeInformation({ url, name, category, id, pwned }) {
  const classes = useStyles()
  console.log("DIV INFORMATION")
  console.log(url)
  console.log(category)
  console.log(pwned)

  return (
    <>
      <div>
        <h4>{url}</h4>
        <h5>{category}</h5>
        {pwned &&
          <Alert severity="error" className={classes.alert}>Password previously appeared in a data breach and should never be used</Alert>
        }
      </div>
    </>
  )
}

export default RelativeInformation