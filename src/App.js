import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublishView from './Publish/publish';
import './App.css'; // Import your CSS file
import Divider from '@mui/material/Divider';
import InvokeView from './Invoke';

axios.defaults.baseURL = 'http://localhost:8080'; // Change to your backend URL

const id_string = "_id_0x";
// programs data structure looks like this 
// {
//   "token_${id_string}1": [["mint", 3], ["transfer", 2]],
//   "lottery_${id_string}3": [["set", 3], ["play", 2]]
//   "token_${id_string}3": [["mint", 3], ["transfer", 2]]
// }
function App() {
  // stores all programs uploaded by user
  const [programs, setPrograms] = useState(null)

  // useEffect(() => {
  //   // Fetch data from the Go API
  //   axios.get('http://localhost:8080/ping')
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);


//   const invokeProgram = () => {
//     console.log(params);
//     console.log(funcName);
//       console.log(id);

//     axios.post('http://localhost:8080/api/invoke', {name: funcName, params: params, programID: id}, {
//       headers: { 'Content-Type': 'application/octet-stream' }}
//       ) // Replace with your data
//         .then(response => {
//           console.log(response.data);
//         })
//         .catch(error => {
//             console.error('Error sending data:', error);
//         });
// };
  const addProgram = (fileName, id, programData) => {
    // convert filename into program name
    var programName = fileName.split(".")[0];
    // append id
    programName = programName + id_string + id;
    // add to programs
    setPrograms({...programs, [programName]: programData});
  }


  return (
    <div className="container">
        <h1 className="header-text">JackJack IDE</h1>
        <Divider  />
      <PublishView addProgram={addProgram}/>
      <Divider  />
      <InvokeView programs={programs}/>

    </div>
  );
}

export default App;
