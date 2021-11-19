import Button from '@material-ui/core/Button'

function SimpleButton({ type }) {
  return (
    <Button variant="contained" color="primary" disableElevation>
      {type}
    </Button>
  )
}

export default SimpleButton
