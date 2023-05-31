import React, { useEffect, useState } from 'react'
import { useStateContext } from '../hooks/useStateContext'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { actions } from '../api'
import InputLayout from './InputLayout'

export default function EditView() {

  const {context, setContext, resetContext} = useStateContext()
  const navigate = useNavigate();

  let newHeader = context.header, newText = context.text, newChecked = context.done;

  const [errors, setErrors] = useState({headerError: false, textError: false})

  const submit = () => {
    setErrors({headerError: (newHeader == ''), textError: (newText == '')})
    if(newHeader == '' || newText == '')
      return;
    try {
      let newRecord = {
        noteID: context.noteID,
        header: newHeader,
        text: newText,
        done: newChecked
      }
      actions.patch(newRecord.noteID, newRecord)
      resetContext()
      window.alert('Success!')
      navigate('/')
    } catch (error) {
      window.alert(`Error: ${error}`) 
    }
  }

  useEffect( () => {
    if(context.noteID == undefined)
      navigate('/');
  }, [])

  return (
    <InputLayout>
      <Typography variant='h3' sx={{marginBlockEnd: '4vw'}}>Note ID: {context.noteID}</Typography>

      <Typography variant='h6'>Note header:</Typography>
      <TextField onChange={(v) => newHeader = v.target.value} defaultValue={context.header}
      error={errors.headerError} helperText='This field is required'></TextField>

      <Typography variant='h6'>Note text:</Typography>
      <TextField onChange={(v) => newText = v.target.value} defaultValue={context.text}
      error={errors.textError} multiline maxRows={4} helperText='This field is required'></TextField>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked={context.done}
          onChange={(v) => newChecked = v.target.checked}
          disableRipple/>}
        label='Done'/>
      </FormGroup>

      <Button onClick={() => submit()} color ='success' sx={{fontSize: '2vw'}}>Submit</Button>
    </InputLayout>
  )
}
