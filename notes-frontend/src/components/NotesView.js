import { Typography } from '@mui/material'
import React, { useState } from 'react'
import Center from './Center'
import { actions } from '../api'

export default function NotesView() {

  const [notes, setNotes] = useState({})

  actions.get()
  .then((results) => {
    setNotes(results)
  })
  .catch((err) => {
    console.log(err);
  })

  return (
    <Center>
        <Typography variant='h2' sx={{m: '10px'}}>
            Welcome to RASPnotes!
        </Typography>
    </Center>
  )
}
