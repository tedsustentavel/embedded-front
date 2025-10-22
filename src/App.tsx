import { BrowserRouter } from "react-router-dom";

import Router from "./routes/Router";

import {AuthProvider} from "./hooks/AuthProvider";
import ScrollToTop from "./routes/ScrollToTop";
import { ChakraProvider, theme } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
