import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import CreateRiddle from "./components/CreateRiddle";
import ViewRiddle from "./components/ViewRiddle";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="viewriddle" element={<ViewRiddle />} />
        <Route path="createriddle" element={<CreateRiddle />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;