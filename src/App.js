import React, { useState, useEffect } from "react";
import axios from "axios";
import PublishView from "./Publish/publish";
import "./App.css"; // Import your CSS file
import Divider from "@mui/material/Divider";
import InvokeView from "./Invoke";
import Chip from "@mui/material/Chip";
import KeysView from "./Keys";
import Grid from "@mui/material/Grid";

axios.defaults.baseURL = "http://localhost:8080"; // Change to your backend URL

const id_string = "_id_0x";
// programs data structure looks like this
// {
//   "token_${id_string}1": [["mint", 3], ["transfer", 2]],
//   "lottery_${id_string}3": [["set", 3], ["play", 2]]
//   "token_${id_string}3": [["mint", 3], ["transfer", 2]]
// }
function App() {
  // stores all programs uploaded by user
  const [programs, setPrograms] = useState(null);

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

  const addProgram = (fileName, id, programData) => {
    // convert filename into program name
    var programName = fileName.split(".")[0];
    // append id
    programName = programName + id_string + id;
    // add to programs
    setPrograms({ ...programs, [programName]: programData });
  };

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <h1 className="header-text">JackJack IDE</h1>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ borderBottom: "2px solid gray", paddingBottom: 10 }}
      >
        <PublishView addProgram={addProgram} />
      </Grid>
      <Grid item xs={12} md={6}>
        <KeysView />
      </Grid>
      <Grid item xs={12} md={6}>
        <InvokeView programs={programs} />
      </Grid>
    </Grid>
  );
}

export default App;
