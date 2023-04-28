import { Typography } from '@mui/material'
import React from 'react'
import Center from './Center'
import { actions } from '../api'

export default function NotesView() {

  

  return (
    <Center>
        <Typography variant='h2' sx={{my: '10'}}>
            Welcome to RASPnotes!
        </Typography>


    </Center>
  )
}
