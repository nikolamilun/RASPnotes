import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Icon, Typography } from '@mui/material'
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

  const deleteNote = (id) => {
    if (window.confirm('Are you sure that you want to delete this note?') == true) {
      actions.delete(id);
    }
  }

  const editNote = (id) => {

  }

  const addNote = () => {

  }

  actions.get()
  .then((results) => {
    setNotes(results.data)
  })
  .catch((err) => {
    console.log(err);
  })


  return (
    <Center>
        <Typography variant='h2' sx={{m: '10px'}}>
            Welcome to RASPnotes!
        </Typography>

        {
          notes.map((item) => 
            <Box>
              <Accordion expanded={expanded === item.noteID} onChange={handleChange(item.noteID)}
              sx={{paddingBlock: '10px'}}
              >
                  <AccordionSummary
                  expandIcon={<Icon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {item.header}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Typography>
                        {item.text}
                    </Typography>

                    <Checkbox {...item.checked ? 'checked' : ''} onChange={() => changeChecked(item.noteID)}/>

                    <Button onClick={editNote(item.id)}>Edit</Button>

                    <Button color='error' onClick={() => deleteNote(item.id)}>Delete</Button>

                  </AccordionDetails>
              </Accordion>
          </Box>
          )
        }
        <Button onClick={() => addNote()}
        sx={{fontSize:'2.5vw'}} color='success'>
          Add a note</Button>
    </Center>
  )
}
