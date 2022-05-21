import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import Forecast from "./components/Forecast";

function App() {
  return (
    <ChakraProvider>
      <Forecast />
    </ChakraProvider>
  );
}

export default App;

// 5days each day of 3 hours

// enough data to make the ui
// get the ma and min of each day and grab one time for each
// if you ask for a diffrent 5 days the UI will still work
