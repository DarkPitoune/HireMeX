import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Frame, Applicant } from "./pages";

const App = () => (
  <Frame>
    <BrowserRouter>
      <Routes>
        <Route path="/applicant/:appId" element={<Applicant />} />
      </Routes>
    </BrowserRouter>
  </Frame>
);

export default App;
