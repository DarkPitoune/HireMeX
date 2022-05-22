import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Frame, Applicant, Welcome } from "./pages";
import { JudgeContextProvider, ChooseJudge } from "./judgeContext";
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
  <JudgeContextProvider>
    <ThemeProvider theme={theme}>
      <ChooseJudge />
      <Frame>
        <BrowserRouter>
          <Routes>
            <Route path="/applicant/:appId" element={<Applicant />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </Frame>
    </ThemeProvider>
  </JudgeContextProvider>
);

export default App;
