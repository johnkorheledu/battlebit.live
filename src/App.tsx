/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from '@mui/system'
import ServerList from './components/server-list/ServerList.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={{
          html: {
            backgroundColor: '#121212',
          },
        }}
      />
      <ServerList />
    </ThemeProvider>
  )
}

export default App
