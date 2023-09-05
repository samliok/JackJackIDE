import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KeysView = (props) => {
    const [keys, setKeys] = useState(null); // Initialize state to an empty string
    useEffect(() => {
        // Fetch data from the Go API
        axios.get('api/keys')
            .then(response => {
                console.log(response.data.keys);
                console.log(response.data);
                setKeys(response.data.keys);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const renderKeys = () => {
        if (keys == null) {
            return <div></div>
        }
        return keys.map((key) => (
            <div>
                <h3>{key}</h3>
            </div>
        ));
    }

  return (
   <div>
         <h2>Showing Keys</h2>
         {renderKeys()}
   </div>
  );
}

export default KeysView;

