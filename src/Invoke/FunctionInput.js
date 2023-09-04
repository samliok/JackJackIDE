import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const FunctionInput = (props) => {
    const name = props.name;
    const numParams = props.numParams;
    const id = props.id;
    
    const [params, setParams] = useState(Array.from({ length: numParams })); // Initialize state to an empty string
    
    const handleInputChange = (event, index) => {
        setParams([...params.slice(0, index), event.target.value, ...params.slice(index + 1)]);
    }

    const invokeProgram = () => {
        console.log(params);
        axios.post('http://localhost:8080/api/invoke', {name: name, params: params, programID: id}, {
            headers: { 'Content-Type': 'application/octet-stream' }}
            ) // Replace with your data
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    }

    
    const renderInputs = () => {
        const inputElements = [];
        for (let i = 0; i < numParams; i++) {
            inputElements.push(
                <div>
            <input
                key={i} 
                type={params[i]}
                placeholder={`Param ${i + 1}`}
                onChange={(e) => {handleInputChange(e, i)}}
            />
            </div>
            );
        }

        return (
            <div>
            {inputElements}
            <Button variant="contained" 
                    onClick={invokeProgram}
                >Send TX</Button>
            </div>
        );
    }
  return (
   <div>
         <h2>{name}</h2>
            {renderInputs()}    
   </div>
  );
}

export default FunctionInput;

