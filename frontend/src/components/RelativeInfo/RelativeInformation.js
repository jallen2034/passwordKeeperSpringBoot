import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  alert: {
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: "13px",
    maxWidth: "200px"
  },
}))


function RelativeInformation({ url, name, category, id, pwned }) {
  const classes = useStyles()

  return (
    <>
      <div>
        <h4>{url}</h4>
        <h5>{category}</h5>
        <h5>{name}</h5>
        {pwned &&
          <Alert severity="error" className={classes.alert}>Password previously appeared in a data breach and should never be used, please change it!</Alert>
        }
      </div>
    </>
  )
}

export default RelativeInformation