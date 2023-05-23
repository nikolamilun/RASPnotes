import React, { useEffect } from 'react'
import { useStateContext } from '../hooks/useStateContext'
import Center from '../components/Center'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CheckBox } from '@mui/icons-material'
import { actions } from '../api'

export default function EditView() {

  const {context, setContext, resetContext} = useStateContext()
  const navigate = useNavigate();

  let header = context.header, text = context.text, checked = context.checked;

  let errors = {headerError: false, textError: false}

  const submit = () => {
    errors.headerError = (header == '')
    errors.textError = (text == '')
    if(errors.headerError || errors.textError)
      return;
    try {
      let newRecord = {
        noteID: context.noteID,
        header,
        text,
        done: checked
      }
      actions.patch(newRecord.noteID, newRecord)
      resetContext()
      window.alert('Success!')
      navigate('/')
    } catch (error) {
     alert(`Error: ${error}`) 
    }
  }

  useEffect( () => {
    if(context == null)
      navigate('/');
  }, [])

  return (
    <Center>
      <Box sx={{padding: '3vw', display:'flex',
       flexDirection: 'column', width: '70%', '*': {
        marginBlock: '1vw',
      }}}>

        <Typography variant='h3'>Note ID: {context.noteID}</Typography>

        <TextField error = {errors.headerError} label='Note header'>{context.header}</TextField>

        <TextField error = {errors.headerError} label='Note text'
        multiline maxRows={4}>{context.text}</TextField>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={context.checked} disableRipple onChange={() => checked = !checked}/>}
           label='Done'/>
        </FormGroup>

        <Button onClick={() => submit()} color ='success' sx={{fontSize: '2vw'}}>Submit</Button>

      </Box>
    </Center>
  )
}
