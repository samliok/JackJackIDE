import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-tailwind/react";

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
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderKeys = () => {
    if (keys == null) {
      return <></>;
    }
    return keys.map((key) => (
      <Button>{key}</Button>
    ));
  };

  return (
    <ButtonGroup>
      {renderKeys()}
    </ButtonGroup>
  );
};

export default KeysView;
