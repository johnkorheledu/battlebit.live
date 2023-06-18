import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { styled, Box, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { ServerData, getServerData } from '../../api/servers.ts'

const columns: GridColDef[] = [
  { field: 'Name', headerName: 'Name' },
  { field: 'Map', headerName: 'Map', width: 110 },
  { field: 'MapSize', headerName: 'Map Size' },
  { field: 'Gamemode', headerName: 'Game Mode', width: 110 },
  { field: 'Region', headerName: 'Region', width: 150 },
  { field: 'Players', headerName: 'Players' },
  { field: 'QueuePlayers', headerName: 'Queue Players' },
  { field: 'MaxPlayers', headerName: 'Max Players' },
  { field: 'Hz', headerName: 'Hz' },
  {
    field: 'DayNight',
    headerName: 'Day/Night',
    renderCell: (params: GridRenderCellParams) => {
      if (params.value === 'Day') {
        return <WbSunnyIcon color='warning' />
      }
      if (params.value === 'Night') {
        return <NightsStayIcon color='info' />
      }
      return params.value
    },
  },
  {
    field: 'IsOfficial',
    headerName: 'Official',
    renderCell: (params: GridRenderCellParams) =>
      params.value ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />,
  },
  {
    field: 'HasPassword',
    headerName: 'Password',
    renderCell: (params: GridRenderCellParams) =>
      params.value ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />,
  },
  { field: 'AntiCheat', headerName: 'Anti Cheat' },
  { field: 'Build', headerName: 'Build', flex: 2 },
]

const DarkDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  '& .MuiDataGrid-cell': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}))

export default function ServerList() {
  const [rows, setRows] = React.useState<ServerData[]>([])

  React.useEffect(() => {
    getServerData().then((data) => {
      const dataWithIds = data.map((item) => ({ id: item.Name, ...item }))
      setRows(dataWithIds)
    })
  }, [])

  return (
    <Box m={2}>
      <Typography variant='h5' color='#fff' gutterBottom>
        Server List
      </Typography>
      <DarkDataGrid
        rows={rows}
        columns={columns}
        density='compact'
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </Box>
  )
}
