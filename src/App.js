import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUploader from './FileUploader';

axios.defaults.baseURL = 'http://localhost:8080'; // Change to your backend URL

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const [uploadedBytes, setUploadedBytes] = useState(null);
  const [userFuncs, setUserFuncs] = useState([]);
  const [id, setId] = useState(0);
  const uploadBytes = (bytes) => {
    setUploadedBytes(bytes);
  }
  useEffect(() => {
    // Fetch data from the Go API
    axios.get('http://localhost:8080/ping')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    const sendDataToGo = () => {
      axios.post('http://localhost:8080/api/publish', uploadedBytes, {
        headers: { 'Content-Type': 'application/octet-stream' }}
        ) // Replace with your data
          .then(response => {
            console.log(response.data);
            setUserFuncs(response.data.functions);
            setId(response.data.id);
              setData(response.data);
          })
          .catch(error => {
              console.error('Error sending data:', error);
          });
  };

  return (
    <div>
      <h1>React Application</h1>
      <p>Message from Go: {message}</p>
      <button onClick={sendDataToGo}>Send Data</button>
     <h2>Functions</h2>
     {userFuncs.map((func) => (
        <div key={func}>
          <h3>{func}</h3>
        </div>
      ))}
      <h2>ID</h2>
      <p>{id}</p>
      

     <FileUploader setBytes={uploadBytes} />
     
    </div>
  );
}

export default App;
