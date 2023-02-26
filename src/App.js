import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import CreateRiddle from "./components/CreateRiddle";
import ViewRiddle from "./components/ViewRiddle";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
function App() {
  // const [data, setData] = useState('');

  // useEffect(() => {
  //   (async function () {

  //     const { text } = await( await fetch(`/api/GetRiddle?` + new URLSearchParams({
  //       user: "ConnorGoodman",
  //       riddle: "RiddleName"
  //     }))).json();
  //     setData(text);
  //     console.log(text);
  //   })();
  // });

  //return <div><Home></Home></div>;

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