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
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "#ecebfa",
        borderRadius: "20px",
        padding: "25px",
        marginBottom: "45px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          flexDirection: "row-reverse",
          right: "0px",
          top: "0px",
        }}
      >
        <IconButton
          aria-label="copy"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{
            position: "relative",
            right: "0px",
          }}
        >
          <InfoIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
            alignItems: "center",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Helpful Tips:
            <ul>
              <li>
                To execute functions within the {getProgramName(programName)}{" "}
                program, click "Send TX" next to the desired function.
              </li>
              <li>
                Passing Parameters
                <ul>
                  <li>
                    {" "}
                    Pass parameters in the <strong>same order</strong> as the
                    original function signature.
                  </li>
                  <li>
                    For boolean values, use <strong>"true"</strong> or{" "}
                    <strong>"false"</strong>.
                  </li>
                  <li>
                    When dealing with Address values, select from the available
                    keys provided above.
                  </li>
                  <li>
                    State (first parameter) for each method is
                    <strong> automatically </strong>
                    handled.
                  </li>
                  <li>
                    If you need to pass in the State of another program, refer
                    to the <strong>ID</strong> displayed on the desired program
                    card.
                  </li>
                </ul>
              </li>
            </ul>
          </Typography>
        </Popover>
      </div>

      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h2" style={{ fontSize: 28, fontWeight: "bold" }}>
            {getProgramName(programName)}
          </Typography>
        </div>
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
