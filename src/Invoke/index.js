import React, { useState, useEffect } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FunctionInput from './FunctionInput';
// move to constants
const id_string = "_id_0x";

const InvokeView = (props) => {

    const programs = props.programs;
    console.log(programs)
    const [currentProgram, setCurrentProgram] = React.useState('');
   

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
            <div>
                <FunctionInput id={getProgramId(currentProgram)} name={func[0]} numParams={func[1]} />
            </div>
        ))
    }

  return (
   <div className='publishContainer'>
   
    {programs != null && 
    
    <div> 
        {renderProgramToggle()} {renderProgramFunctions()}    
     </div>

    
    }   
   </div>
  );
}

export default InvokeView;

