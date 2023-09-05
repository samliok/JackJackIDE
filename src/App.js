import React, { useState, useEffect } from "react";
import axios from "axios";
import PublishView from "./Publish/publish";
import "./App.css"; // Import your CSS file
import InvokeView from "./Invoke";
import KeysView from "./Keys";
import { Navbar, Typography } from "@material-tailwind/react";


axios.defaults.baseURL = "http://localhost:8080"; // Change to your backend URL

const id_string = "_id_0x";
// programs data structure looks like this
// {
//   "token_${id_string}1": [["mint", 3], ["transfer", 2]],
//   "lottery_${id_string}3": [["set", 3], ["play", 2]]
//   "token_${id_string}3": [["mint", 3], ["transfer", 2]]
// }
function App() {
  // stores all programs uploaded by user
  const [programs, setPrograms] = useState(null);

  // useEffect(() => {
  //   // Fetch data from the Go API
  //   axios.get('http://localhost:8080/ping')
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const addProgram = (fileName, id, programData) => {
    // convert filename into program name
    var programName = fileName.split(".")[0];
    // append id
    programName = programName + id_string + id;
    // add to programs
    setPrograms({ ...programs, [programName]: programData });
  };

  return (
    <div className="container h-full w-full pt-5 flex flex-col justify-center bg-teal-50">
      <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4" color="blue-gray">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold text-white"
        >
          WASM VM Simulator
        </Typography>
        <PublishView addProgram={addProgram} />

        <KeysView />
      </Navbar>

      <InvokeView programs={programs} />
    </div>
  );
}

export default App;
