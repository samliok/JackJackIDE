import React, { useState, useEffect } from "react";
import axios from "axios";
import PublishView from "./Publish/publish";
import "./App.css"; // Import your CSS file
import Divider from "@mui/material/Divider";
import InvokeView from "./Invoke";
import Chip from "@mui/material/Chip";
import KeysView from "./Keys";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

axios.defaults.baseURL = "http://localhost:8080"; // Change to your backend URL

const id_string = "_id_0x";
// programs data structure looks like this
// {
//   "1": [["mint", 3], ["transfer", 2]],
//   "2": [["set", 3], ["play", 2]]
//   "3": [["mint", 3], ["transfer", 2]]
// }
function App() {
  // stores all programs uploaded by user
  const [programs, setPrograms] = useState(null);
  const [cachedNames, setCachedNames] = useState(null);
  useEffect(() => {
    // Fetch data from the Go API
    axios
      .get("api/programs")
      .then((response) => {
        const programsData = response.data;
        setPrograms(programsData.programs);
      })
      .catch((error) => {
        alert("Please start go server. See README.md for instructions.");
        console.error("Error fetching data:", error);
      });
  }, []);

  const addProgram = (fileName, id, programData) => {
    setCachedNames({ ...cachedNames, [id]: fileName.split(".")[0] });
    setPrograms({ ...programs, [id]: programData });
  };

  return (
    <div className="container">
      <Grid
        container
        spacing={2}
        direction="column"
        style={{ width: "75%", margin: "0 auto", alignItems: "center" }}
      >
        <Grid item xs={12} style={{ padding: "16px 0" }}>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold" }}
            className="header-text"
          >
            WASM Program IDE
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: "#FAFFFD",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px",
            borderRadius: "20px",
          }}
          align="center"
        >
          <PublishView addProgram={addProgram} />
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: "#FAFFFD",
            margin: "20px",
            borderRadius: "20px",
          }}
          align="center"
        >
          <KeysView />
        </Grid>

        <Grid item xs={12} align="center">
          <InvokeView cachedNames={cachedNames} programs={programs} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
