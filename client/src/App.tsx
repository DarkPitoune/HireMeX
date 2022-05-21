import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Frame, Applicant } from "./pages";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Frame>
      <BrowserRouter>
        <Routes>
          <Route path="/applicant/:appId" element={<Applicant />} />
        </Routes>
      </BrowserRouter>
    </Frame>
  </ThemeProvider>
);

export default App;
