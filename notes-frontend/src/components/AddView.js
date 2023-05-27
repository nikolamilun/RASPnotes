import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { actions } from '../api'
import InputLayout from './InputLayout'

export default function AddView() {

  let header = '', text = '', done
  const [errors, setErrors] = useState({headerError: false, textError: false})
  const navigate = useNavigate()

  let submit = () => {
    setErrors({headerError: (header == ''), textError: (text == '')})
    if(header == '' || text == '')
      return;
    try {
      let newRecord = {
        header: header,
        text: text,
        done: done
      }
      actions.post(newRecord)
      window.alert('Success!')
      navigate('/')
    } catch (error) {
      window.alert(`Error: ${error}`) 
    }
  }

  return (
    <InputLayout>
      <Typography variant='h2' sx={{marginBlock: '4vw'}}>Add a note</Typography>

      <Typography variant='h6'>Note header:</Typography>
      <TextField onChange={(v) => header = v.target.value}
      error={errors.headerError}></TextField>

      <Typography variant='h6'>Note text:</Typography>
      <TextField onChange={(v) => text = v.target.value}
      error={errors.textError} multiline maxRows={4}></TextField>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox
          onChange={(v) => done = v.target.checked}
          disableRipple/>}
        label='Done'/>
      </FormGroup>

      <Button onClick={() => submit()} color ='success' sx={{fontSize: '2vw'}}>Submit</Button>
    </InputLayout>
  )
}
