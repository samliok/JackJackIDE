import React, { useState } from 'react';

const FileUploader = (props) => {
  const [fileBytes, setFileBytes] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        props.setBytes(bytes);
        setFileBytes(bytes);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {fileBytes && (
        <div>
          <h2>File Bytes:</h2>
          <pre>{JSON.stringify(Array.from(fileBytes), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
