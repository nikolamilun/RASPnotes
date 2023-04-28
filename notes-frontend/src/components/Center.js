import React from 'react'
import {Box} from '@mui/material'

export default function Center(props) {
  return (
    <Box sx={{
        width : '70%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'column',
        mx: 'auto',
        '*' : {
          display: 'flex'
        }
    }}>
        {props.children}
    </Box>
  )
}
