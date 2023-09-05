import React, { useState, useEffect } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FunctionInput from './FunctionInput';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

// move to constants
const id_string = "_id_0x";

const InvokeView = (props) => {

    const programs = props.programs;

    const [currentProgram, setCurrentProgram] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState("success");
    const dsiplayAlert = (message, severity) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertSeverity(severity);
    }
    const handleChange = (
        event,
        newAlignment
      ) => {
        setCurrentProgram(newAlignment);
      };

      const renderProgramToggle = () => {
        return <ToggleButtonGroup
            color="primary"
            value={currentProgram}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            {Object.keys(programs).map((key) => (
                <ToggleButton key={key} value={key}>{key}</ToggleButton>
            ))
            }
        </ToggleButtonGroup>
    }

    const getProgramId = (programName) => {
        return programName.split(id_string)[1];
    }

    const renderProgramFunctions = () => {
        // get current program
        var program = programs[currentProgram];
        if (program == null) {
            return <div></div>
        }
        // loop through functions
        return program.map((func) => (
            <div key={func[0]}>
                <FunctionInput displayAlert={dsiplayAlert} id={getProgramId(currentProgram)} name={func[0]} numParams={func[1]} />
            </div>
        ))
    }

  return (
   <div className='publishContainer'>
    {programs != null && 
    <div> 

    {renderProgramToggle()}    
      <Collapse in={alertOpen}>
        <Alert
          severity={alertSeverity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      </Collapse>
        
        {renderProgramFunctions()}    
     </div>

    
    }   
   </div>
  );
}

export default InvokeView;

