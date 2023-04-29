import React from 'react'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Note(props) {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    

  return (
    <Box>
        <Accordion expanded={expanded === props.id} onChange={handleChange(props.id)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  props.header
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
                  props.text
              </Typography>

              <Checkbox {...props.checked ? 'checked' : ''} />
            </AccordionDetails>
        </Accordion>
    </Box>
  )
}
