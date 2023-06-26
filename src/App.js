import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'; // Update the import statement
import Home from './components/Home';
import CreateRiddle from './components/CreateRiddle';
import ViewRiddle from './components/ViewRiddle';
import NoPage from './components/NoPage';
import NavBar from './components/NavBar';
import MobileNavBar from './components/MobileNavBar';
import About from './components/About';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
    {isMobile ? console.log("mobile") : console.log("not mobile")}
      {isMobile ? <MobileNavBar /> : <NavBar />}
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="viewriddle" element={<ViewRiddle />} />
          <Route path="createriddle" element={<CreateRiddle />} />  
          <Route path="about" element={<About/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render instead of createRoot

export default App;
