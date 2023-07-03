import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'; // Update the import statement
//import Home from './components/Home';
import Home2 from './components/Home2';
import CreateRiddle from './components/CreateRiddle';
import ViewRiddle from './components/ViewRiddle';
import NoPage from './components/NoPage';
import NavBar from './components/NavBar';
import MobileNavBar from './components/MobileNavBar';
import About from './components/About';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
  
  // Define your custom theme colors
  const themeColors = {
    primary: '#000724', // Dark Blue
    secondary: '#353535', // Dark grey
    background: '#eeeeee', // Light grey
    lockerBackground: '#cccccc', // Lighter grey
    lockerText: '#000000', // Black
    text: '#212121', // Black
    light_text: '#fff', //white
  };

  // Create a Material-UI theme using the custom colors
  const theme = createTheme({
    palette: {
      primary: {
        main: themeColors.primary,
      },
      secondary: {
        main: themeColors.secondary,
      },
      background: {
        main: themeColors.background,
        secondary: themeColors.lockerBackground,
      },
      text: {
        main: themeColors.text,
      },
      light_text: {
        main: themeColors.light_text,
      },
      locker: {
        background: themeColors.primary,
        text: themeColors.light_text,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      {isMobile ? console.log("mobile") : console.log("not mobile")}
        {isMobile ? <MobileNavBar /> : <NavBar />}
        <Routes>
          <Route path="/">
            <Route index element={<Home2/>} />
            <Route path="viewriddle" element={<ViewRiddle />} />
            <Route path="createriddle" element={<CreateRiddle />} />  
            <Route path="about" element={<About/>} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render instead of createRoot

export default App;
