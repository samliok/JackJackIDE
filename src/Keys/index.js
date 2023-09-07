import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const KeysView = (props) => {
  const [keys, setKeys] = useState(null); // Initialize state to an empty string
  useEffect(() => {
    // Fetch data from the Go API
    axios
      .get("api/keys")
      .then((response) => {
        console.log(response.data.keys);
        console.log(response.data);
        setKeys(response.data.keys);
      })
      .catch((error) => {
        alert("Please start go server. See README.md for instructions.");
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCopyClick = (keyToCopy) => {
    navigator.clipboard
      .writeText(keyToCopy)
      .then(() => {
        // Successfully copied to clipboard
        console.log("Copied to clipboard!");
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to copy: ", error);
      });
  };

  const renderKeys = () => {
    if (keys == null) {
      return <div></div>;
    }
    return keys.map((key) => (
      <div
        key={key}
        style={{
          display: "flex",
        }}
      >
        <h3>{key}</h3>
        <IconButton aria-label="copy" onClick={() => handleCopyClick(key)}>
          <ContentCopyIcon />
        </IconButton>
      </div>
    ));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2 className="second-header">Available Public Keys</h2>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        {renderKeys()}
      </Grid>
    </Grid>
  );
};

export default KeysView;
