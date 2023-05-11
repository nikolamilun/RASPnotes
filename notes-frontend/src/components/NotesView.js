import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Typography } from '@mui/material'
import React, {useState } from 'react'
import Center from './Center'
import { actions } from '../api'

export default function NotesView() {

  const [notes, setNotes] = useState([])
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeChecked = (id) => {
    
  }

  actions.get()
  .then((results) => {
    setNotes(results.data)
    setNotes([results])
  })
  .catch((err) => {
    console.log(err);
  })


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Center>
        <Typography variant='h2' sx={{m: '10px'}}>
            Welcome to RASPnotes!
        </Typography>

        {
          notes.map((item) => 
            <Box>
              <Accordion expanded={expanded === item.noteID} onChange={handleChange(item.noteID)}>
                  <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {item.header}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography>
                        {item.text}
                    </Typography>

                    <Checkbox {...item.checked ? 'checked' : ''} onChange={changeChecked(item.noteID)}/>
                  </AccordionDetails>
              </Accordion>
          </Box>
          )
        }
    </Center>
  )
}
