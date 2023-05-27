import React from 'react'
import Center from './Center'
import { Box } from '@mui/material'

export default function InputLayout(props) {
  return (
    <Center>
        <Box sx={{padding: '3vw', display:'flex',
        flexDirection: 'column', width: '70%', '*': {
            marginBlock: '1vw',
        }}}>
            {props.children}
        </Box>
    </Center>
  )
}
