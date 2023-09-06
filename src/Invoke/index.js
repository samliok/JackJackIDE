import React, { useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FunctionInput from "./FunctionInput";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import ProgramCard from "./ProgramCard";

// move to constants
const id_string = "_id_0x";

const InvokeView = (props) => {
  const programs = props.programs;

  const renderPrograms = () => {
    if (programs == null) {
      return <></>;
    }
    return Object.keys(programs)
      .reverse()
      .map((key) => <ProgramCard programName={key} program={programs[key]} />);
  };
  return <>{renderPrograms()}</>;
};

export default InvokeView;
