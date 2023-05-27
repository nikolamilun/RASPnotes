import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Typography } from '@mui/material'
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
  const { context, resetContext, setContext } = useStateContext();


  const refreshView = () => {
    actions.get()
    .then((results) => {
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
    let oldObj = FindNoteWithID(notes, id);
    let newNotes = [...notes];
    let newObj = {
      ...oldObj,
      done: !done
    }
    actions.patch(id, newObj);
    newNotes.splice(notes.indexOf(oldObj) , 1, newObj)
    setNotes(newNotes);
  }

  const deleteNote = (item) => {
    if (window.confirm('Are you sure that you want to delete this note?') == true) {
      actions.delete(item.noteID);
      if (context.noteID == item.noteID) {
        resetContext()
      }
      let newNotes = [...notes];
      newNotes.splice(notes.indexOf(item), 1);
      setNotes(newNotes)
    }
  }

  const editNote = () => {
    if(FindNoteWithID(notes, context.noteID) == null)
      navigate('/')
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
                <Accordion expanded={expanded === item.noteID} onChange={handleChange(item.noteID)}
                sx={{width: '100%'}}>
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
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                      <Typography variant='h6'>
                          {item.text}
                      </Typography>

                      <Box>
                        <Checkbox checked={item.done} onChange={() => changeChecked(item.noteID, item.done)}/>

                        <Button onClick={
                          () => {
                            setContext(item)
                            editNote(item.id)
                          }
                        }>Edit</Button>

                        <Button color='error' onClick={() => deleteNote(item)}>Delete</Button>
                      </Box>

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
