import React, { useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FunctionInput from "./FunctionInput";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Grid";

// move to constants
const id_string = "_id_0x";
const getProgramId = (programName) => {
  return programName.split(id_string)[1];
};
const getProgramName = (programName) => {
  return programName.split(id_string)[0];
};

const ProgramCard = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const program = props.program;
  const programName = props.programName;
  const displayAlert = (message, severity) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const renderProgramFunctions = () => {
    // get current program
    if (program == null) {
      return <></>;
    }
    // loop through functions
    return program.map((func) => (
      <FunctionInput
        key={func[0]}
        displayAlert={displayAlert}
        id={getProgramId(programName)}
        name={func[0]}
        numParams={func[1]}
      />
    ));
  };
  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "#ecebfa",
        borderRadius: "20px",
        padding: "25px",
        marginBottom: "45px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h2" style={{ fontSize: 28, fontWeight: "bold" }}>
          {getProgramName(programName)}
        </Typography>
        <Typography variant="h3" style={{ fontSize: 15, fontWeight: "bold" }}>
          ID: {getProgramId(programName)}
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} style={{ width: "50%" }}>
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
  );
};

export default ProgramCard;
