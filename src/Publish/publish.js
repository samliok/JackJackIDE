import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

const PublishView = (props) => {
  const [fileBytes, setFileBytes] = useState(null);
  const [fileName, setFileName] = useState("");

  const publishProgramToGo = () => {
    // ensure filename doesn't change during upload
    const requestFileName = fileName;
    // send request
    axios
      .post("/api/publish", fileBytes, {
        headers: { "Content-Type": "application/octet-stream" },
      })
      .then((response) => {
        console.log(response.data);
        var data = [];
        // loop through key value pairs
        for (const [key, value] of Object.entries(
          response.data.function_data
        )) {
          data.push([key, value]);
        }
        console.log(data);
        props.addProgram(requestFileName, response.data.id, data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FileUploader
          fileName={fileName}
          setFileName={setFileName}
          setBytes={setFileBytes}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          disabled={fileBytes == null}
          onClick={publishProgramToGo}
          variant="contained"
        >
          Publish Program!
        </Button>
      </Grid>
    </Grid>
  );
};

export default PublishView;
