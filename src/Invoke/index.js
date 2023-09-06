import React, { useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FunctionInput from "./FunctionInput";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

// move to constants
const id_string = "_id_0x";

const InvokeView = (props) => {
  const programs = props.programs;

  const [currentProgram, setCurrentProgram] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const dsiplayAlert = (message, severity) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
  };
  const handleChange = (event, newAlignment) => {
    setCurrentProgram(newAlignment);
  };

  const renderProgramToggle = () => {
    return (
      <ToggleButtonGroup
        color="primary"
        value={currentProgram}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {Object.keys(programs).map((key) => (
          <ToggleButton key={key} value={key}>
            {key}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  const getProgramId = (programName) => {
    return programName.split(id_string)[1];
  };

  const renderProgramFunctions = () => {
    // get current program
    var program = programs[currentProgram];
    if (program == null) {
      return <></>;
    }
    // loop through functions
    return program.map((func) => (
      <FunctionInput
        key={func[0]}
        displayAlert={dsiplayAlert}
        id={getProgramId(currentProgram)}
        name={func[0]}
        numParams={func[1]}
      />
    ));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {programs != null && (
          <Grid item xs={12}>
            <Grid item xs={12}>
              {renderProgramToggle()}
            </Grid>
            <Grid item xs={12} md={9}>
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
            </Grid>
            <Grid item xs={12}>
              {renderProgramFunctions()}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default InvokeView;
