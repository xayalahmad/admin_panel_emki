import AddEvent from './components/Events/AddEvent/AddEvent';
import './tailwind.css'
import { theme } from './MuiTheme'
import { ThemeProvider } from "@mui/material";
// import PostRequest from './components/Api/PostRequest/PostRequest';
import Login from './components/Login/Login';
import AddLanguage from './components/AddLanguage/AddLanguage';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';
function App() {
  const { tokenBoolean } = useSelector(state => state.tokenBoolean)
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <BrowserRouter> */}
          {tokenBoolean ?
            <Home />
            :
            <Login />
          }
          <AddEvent />
          <AddLanguage />

        {/* </BrowserRouter> */}
      </ThemeProvider>
      {/* <PostRequest /> */}
    </>
  );
}

export default App;
