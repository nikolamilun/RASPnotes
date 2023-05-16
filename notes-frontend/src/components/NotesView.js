import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Icon, Typography } from '@mui/material'
import React, {useState } from 'react'
import Center from './Center'
import { actions } from '../api'
import { useNavigate } from 'react-router-dom'
import {useStateContext} from '../hooks/useStateContext'
import FindNoteWithID from '../helper/Tools'

export default function NotesView() {

  const [notes, setNotes] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate()
  const { context, updateContext, resetContext } = useStateContext();


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeChecked = (id, checked) => {
    let oldObj = FindNoteWithID(notes, id);
    let newObj = {
      ...oldObj,
      noteID: id
    }
    updateContext(oldObj, newObj);
    setNotes(context);
    actions.patch(id, newObj);
  }

  const deleteNote = (id) => {
    if (window.confirm('Are you sure that you want to delete this note?') == true) {
      actions.delete(id);
    }
  }

  const editNote = (id) => {
    navigate('/edit')
  }

  const addNote = () => {
    navigate('/add')
  }

  actions.get()
  .then((results) => {
    setNotes(results.data)
    updateContext(notes)
  })
  .catch((err) => {
    console.log(err);
  })


  return (
    <Center>
        <Typography variant='h2' sx={{m: '10px'}}>
            Welcome to RASPnotes!
        </Typography>

        <Box sx={{
          border: '2px solid white',
          borderRadius: '1vw 1vw',
          padding: '5px'
          }}>
          {
            notes.map((item, index) => 
              <Box sx={{marginBlock: '10px'}} key={index}>
                <Accordion expanded={expanded === item.noteID} onChange={() => handleChange(item.noteID)}>
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

                      <Checkbox {...item.checked ? 'checked' : ''} onChange={() => changeChecked(item.noteID, item.checked)}/>

                      <Button onClick={() => editNote(item.id)}>Edit</Button>

                      <Button color='error' onClick={() => deleteNote(item.id)}>Delete</Button>

                    </AccordionDetails>
                </Accordion>
            </Box>
            )
          }
        </Box>

        <Button onClick={() => addNote()}
        sx={{fontSize:'2.5vw', marginBlock: '20px'}} color='success'>
          Add a note</Button>
    </Center>
  )
}
