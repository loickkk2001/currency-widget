import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- Import ReactDOM
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Export a component for embedding
export const CurrencyWidget = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
};

// Also include a self-initialization function for standalone usage
export function initCurrencyWidget(elementId = 'root') {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<CurrencyWidget />);
  }
}

// Auto-initialize if the script is loaded directly
if (typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initCurrencyWidget();
  });
}
