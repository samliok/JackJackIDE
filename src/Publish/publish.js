import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import axios from 'axios';

const PublishView = (props) => {
    const [fileBytes, setFileBytes] = useState(null);
    const [fileName, setFileName] = useState('');

    const publishProgramToGo = () => {
        // ensure filename doesn't change during upload
        const requestFileName = fileName;
        // send request
        axios.post('http://localhost:8080/api/publish', fileBytes, {
          headers: { 'Content-Type': 'application/octet-stream' }}
          ) 
            .then(response => {
              console.log(response.data);
              var data = []
              // loop through key value pairs
              for (const [key, value] of Object.entries(response.data.function_data)) {
                data.push([key, value])
              }
              console.log(data);
              props.addProgram(requestFileName, response.data.id, data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
        }

  return (
   <div className='publishContainer'>
     <FileUploader fileName={fileName} setFileName={setFileName} setBytes={setFileBytes} />
    <button onClick={publishProgramToGo}>Publish Program!</button>
   </div>
  );
}

export default PublishView;

