import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import CSSBaseline from '@mui/material/CssBaseline';//
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CurrencyWidget from './Components/currencyWidget';
import ExchangeForm from '@steps/ExchangeForm';
import { TransactionDetails } from 'types';

// Create a dark theme with custom primary and secondary colors
// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#13629F',
//     },
//     secondary: {
//       main: '#F3DB41',
//     },
//     background: {
//       default: '#121212',
//       paper: '#1E1E1E',
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: 'rgba(255, 255, 255, 0.7)',
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h4: {
//       fontWeight: 600,
//     },
//     h5: {
//       fontWeight: 500,
//     },
//     h6: {
//       fontWeight: 500,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           borderRadius: 8,
//           padding: '10px 16px',
//           fontWeight: 500,
//         },
//         containedPrimary: {
//           backgroundColor: '#13629F',
//           '&:hover': {
//             backgroundColor: '#0D4A7A',
//           },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//         },
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//         },
//       },
//     },
//   },
// });

function App() {
  return (
    // <Box
    //    sx={{
    //      bgcolor: '#121212',
    //      minHeight: '100vh',
    //      py: 4,
    //      display: 'flex',
    //      flexDirection: 'column',
    //      alignItems: 'center',
    //    }}
    //  >
    //    <Container maxWidth="md">
    //      <Box
    //      sx={{
    //          textAlign: 'center',
    //          mb: 4
    //        }}
    //      >
         
    //        <Typography variant="h4" component="h1" gutterBottom>
    //         AfriPay Money Transfer
    //        </Typography>
    //        <Typography variant="body1" color="text.secondary">
    //          Fast, secure money transfers to Africa
    //        </Typography>
    //      </Box>
       
    //      <Box
    //        sx={{
    //          maxWidth: 600,
    //          mx: 'auto'
    //        }}
    //      >
    //        <CurrencyWidget companyName="Dikalo" />
    //      </Box>
    //    </Container>
    //  </Box>
    <>
      <div>
        <h1>Title</h1>
      </div>
    </>
  
    
  );
}

export default App;