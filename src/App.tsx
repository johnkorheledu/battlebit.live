/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from '@mui/system'
import ServerList from './components/server-list/ServerList.tsx'
import { ServerDataProvider } from './components/context/ServerDataContext.tsx';
import ChartsContainer from './components/charts-container/ChartsContainer.tsx';


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
    <ServerDataProvider>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles
          styles={{
            html: {
              backgroundColor: '#121212',
            },
          }}
        />
        <ServerList />
        <ChartsContainer
          heading='Server Distribution'
          charts={[
            { dataKey: "Map", title: "Map" },
            { dataKey: "Gamemode", title: "Gamemode" },
            { dataKey: "Region", title: "Region" }
          ]}
        />
        <ChartsContainer
          heading='Player Distribution'
          charts={[
            { dataKey: "Map", title: "Map", aggregatePlayers: true },
            { dataKey: "Gamemode", title: "Gamemode", aggregatePlayers: true },
            { dataKey: "Region", title: "Region", aggregatePlayers: true }
          ]}
        />

      </ThemeProvider>
    </ServerDataProvider>
  )
}

export default App
