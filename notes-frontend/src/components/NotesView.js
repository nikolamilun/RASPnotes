import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Icon, Typography } from '@mui/material'
import React, {useEffect, useState } from 'react'
import Center from './Center'
import { actions } from '../api'
import { useNavigate } from 'react-router-dom'
import {useStateContext} from '../hooks/useStateContext'
import FindNoteWithID from '../helper/Tools'

export default function NotesView() {

  const [notes, setNotes] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate()
  const { context, updateContext, resetContext, setContext } = useStateContext();


  const refreshView = () => {
    actions.get()
    .then((results) => {
      setContext(results.data)
      setNotes(results.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeChecked = (id, done) => {
    console.log(context);
    let oldObj = FindNoteWithID(notes, id);
    let newObj = {
      ...oldObj,
      done: !done
    }
    actions.patch(id, newObj);
    refreshView()
  }

  const deleteNote = (id) => {
    if (window.confirm('Are you sure that you want to delete this note?') == true) {
      actions.delete(id);
      refreshView()
    }
  }

  const editNote = (id) => {
    navigate('/edit')
  }

  const addNote = () => {
    navigate('/add')
  }

  useEffect(() => {
    refreshView()
  }, [])

  return (
    <Center>
        <Typography variant='h2' sx={{m: '10px'}}>
            Welcome to RASPnotes!
        </Typography>

        <Box sx={{
          border: '2px solid blue',
          borderRadius: '1vw 1vw',
          padding: '5px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
          }}>
          {
            notes.map((item) => 
              <Box sx={{marginBlock: '10px'}} key={item.noteID}>
                <Accordion expanded={expanded === item.noteID} onChange={handleChange(item.noteID)}>
                    <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{padding: '1vw'}}
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

                      <Checkbox checked={item.done} onChange={() => changeChecked(item.noteID, item.done)}/>

                      <Button onClick={() => editNote(item.id)}>Edit</Button>

                      <Button color='error' onClick={() => deleteNote(item.noteID)}>Delete</Button>

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
