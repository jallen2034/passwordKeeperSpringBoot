import React from 'react';
import RelativeInformation from '../RelativeInfo/RelativeInformation';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';


function PasswordEntry() {
  return (
    <>
      <RelativeInformation></RelativeInformation>
      <TextField></TextField>
      <div>
        <Button></Button>
        <Button></Button>
        <Button></Button>
      </div>
    </>
  )
}

export default PasswordEntry