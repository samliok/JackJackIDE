// from chatgpt with modifications
import React, { useState } from "react";
import Input from "@mui/material/Input";

const FileUploader = (props) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      props.setFileName(file.name);

      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        props.setBytes(bytes);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
