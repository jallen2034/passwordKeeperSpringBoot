import React from 'react'
import RelativeInformation from '../RelativeInfo/RelativeInformation'
import TextField from '../TextField/TextField'
import Button from '../Button/Button'


function PasswordEntry({url, passwordText, category, id, name}) {

  return (
    <>
      <RelativeInformation
        url={url}
        name={name}
        category={category}
      />
      <TextField
        passwordText={passwordText}
      />
      <div>
        <Button
          type={"copy"}
        />
        <Button
          type={"edit"}
        />
        <Button
          type={"delete"}
        />
      </div>
    </>
  )
}

export default PasswordEntry