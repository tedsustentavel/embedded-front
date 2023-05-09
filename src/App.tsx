import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Router from "./routes/Router";

import AuthProvider from "./hooks/auth";
import ScrollToTop from "./routes/ScrollToTop";
function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <AuthProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            primaryColor: "green",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <BrowserRouter>
            <Notifications />
            <ScrollToTop />
            <Router />
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  );
}

export default App;
