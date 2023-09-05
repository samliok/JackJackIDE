import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const FunctionInput = (props) => {
  const name = props.name;
  const numParams = props.numParams;
  const id = props.id;

  const [params, setParams] = useState(Array.from({ length: numParams })); // Initialize state to an empty string

  const handleInputChange = (event, index) => {
    setParams([
      ...params.slice(0, index),
      event.target.value,
      ...params.slice(index + 1),
    ]);
  };

  const invokeProgram = () => {
    console.log(params);
    axios
      .post(
        "/api/invoke",
        { name: name, params: params, programID: id },
        {
          headers: { "Content-Type": "application/octet-stream" },
        }
      ) // Replace with your data
      .then((response) => {
        props.displayAlert(
          "Success! TX returned: ".concat(response.data.result),
          "success"
        );
        console.log(response.data);
      })
      .catch((error) => {
        props.displayAlert(error.message, "error");
        console.error("Error sending data:", error);
      });
  };

  const renderInputs = () => {
    const inputElements = [];
    for (let i = 0; i < numParams; i++) {
      inputElements.push(
        <TextField
          style={{ paddingRight: 10 }}
          id="standard-basic"
          variant="standard"
          key={i}
          type="text"
          placeholder={`Param ${i + 1}`}
          onChange={(e) => {
            handleInputChange(e, i);
          }}
        />
      );
    }

    return (
      <Grid container spacing={2} align="left">
        <Grid xs={12} md={9}>
          {inputElements}
        </Grid>
        <Grid xs={12} md={3}>
          <Button variant="contained" onClick={invokeProgram}>
            Send TX
          </Button>
        </Grid>
      </Grid>
    );
  };
  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <h2 className="second-header">{name}</h2>
        {renderInputs()}
      </Grid>
    </Grid>
  );
};

export default FunctionInput;
