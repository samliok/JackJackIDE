import React, { useState, useEffect } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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




      const renderPrograms = () => {
        return <ToggleButtonGroup
            color="primary"
            value={currentProgram}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            {Object.keys(programs).map((key) => (
                <ToggleButton value={key}>{key}</ToggleButton>
            ))
            }
        </ToggleButtonGroup>
    }

    //   const programToggleButtons = () => {
    //     var programList = []

    //     for (const [key, value] of Object.entries(programs)) {
    //         programList.push(<ToggleButton value={key}>key</ToggleButton>)
    //       }
    //     }
    //     return programList;
    //     }
  return (
   <div className='publishContainer'>
   
    {programs != null && 
    renderPrograms()
    }   
   </div>
  );
}

export default InvokeView;

