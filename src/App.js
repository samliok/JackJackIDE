import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUploader from './FileUploader';

axios.defaults.baseURL = 'http://localhost:8080'; // Change to your backend URL

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const [uploadedBytes, setUploadedBytes] = useState(null);
  const [userFuncs, setUserFuncs] = useState([]);
  const [funcName, setFuncName] = useState('');
  const [params, setParams] = useState('');

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
            var data = []
            // loop through key value pairs
            for (const [key, value] of Object.entries(response.data.function_data)) {
              data.push([key, value])
            }
            setUserFuncs(data);
            console.log(data);
            setId(response.data.id);
            setData(response.data);
          })
          .catch(error => {
              console.error('Error sending data:', error);
          });
  };
  const invokeProgram = () => {
    console.log(params);
    console.log(funcName);
      console.log(id);

    axios.post('http://localhost:8080/api/invoke', {name: funcName, params: params, programID: id}, {
      headers: { 'Content-Type': 'application/octet-stream' }}
      ) // Replace with your data
        .then(response => {
          console.log(response.data);
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
        <div key={func[0]}>
          <h3>{func[0]}</h3>
          <h3>{func[1]}</h3>
        </div>
      ))}
      <h2>ID</h2>
      <p>{id}</p>
      

     <FileUploader setBytes={uploadBytes} />
     
     <label>
        Function: <input name={funcName} onChange={setFuncName} />
        Params: <input name={params} onChange={setParams} />
      </label>
      <button onClick={invokeProgram}>Call Function</button>

    </div>
  );
}

export default App;
