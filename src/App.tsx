import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PDFViewer from "./pages/PDFViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<PDFViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
