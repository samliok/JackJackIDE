import React, { useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FunctionInput from "./FunctionInput";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { Card, CardBody, CardFooter, Button, Typography, Input } from "@material-tailwind/react";

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

  return (<>
    <Card className="mx-auto mt-6 w-full max-w-[26rem]">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Lottery
        </Typography>
        <Typography>
          <form className="">
            <div className="mb-4 flex flex-col gap-6">
              <div class="pt-6">
                <Typography as="Test" className="pt-6 mr-4 py-1.5 font-bold">Function Name</Typography>
              </div>
              <Input type="number" size="lg" label="Parameter 1" />
              <Input type="string" size="lg" label="Parameter 2" />
            </div>
            <Button className="mt-6" color="blue-gray" fullWidth>
              Submit Transaction
            </Button>
          </form>
        </Typography>
      </CardBody>
    </Card>

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
  </>
  );
};

export default InvokeView;
