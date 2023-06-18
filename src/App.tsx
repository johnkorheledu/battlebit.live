import React from 'react';
import ServerList from './components/server-list/ServerList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #8F91A2;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #202020; 
        }

        ::-webkit-scrollbar-thumb {
          background: #888; 
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <ServerList />
    </ThemeProvider>
  );
}

export default App;
