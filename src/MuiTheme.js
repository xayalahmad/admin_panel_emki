import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary:{
      main: '#151A30',

    },
    secondary:{
      main: '#e32682',
    },
      main: '#1C213C',
      contrastText: "#fff",
      red: '#FF0000',
  },
  
  
//   typography: {
//     button: {
//       textTransform: 'none',
//       color: 'white'
//     }
//   },
//   overrides: {
//     MuiButton: {
//       raisedPrimary: {
//         color: 'white',
//       },
//     },
//   }
breakpoints: {
  values: {
    xs: 300,
    sm: 600,
    md: 1080,
    lg: 1200,
    xl: 1536,
  },
},

});