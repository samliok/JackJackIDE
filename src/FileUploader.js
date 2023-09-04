import React, { useState } from 'react';

const FileUploader = (props) => {
  const [fileBytes, setFileBytes] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      setFileName(file.name);

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
      {fileName && <p>Uploaded File: {fileName}</p>}
      {fileBytes && (
        <div>
          <h2>File Bytes:</h2>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
