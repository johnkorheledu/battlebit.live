import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { styled, Box, TextField } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { ServerData, getServerData } from '../../api/servers.ts'


const fields = ['Name', 'Map', 'MapSize', 'Gamemode', 'Region', 'Players', 'QueuePlayers', 'MaxPlayers', 'Hz', 'AntiCheat', 'Build', 'DayNight', 'IsOfficial', 'HasPassword']

const checkOrCancel = ({ value }: GridRenderCellParams) => value ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />;

const specialRenderCell = {
  DayNight: ({ value }: GridRenderCellParams) => 
    value === 'Day' ? <WbSunnyIcon color='warning' /> : <NightsStayIcon color='info' />,
  IsOfficial: checkOrCancel,
  HasPassword: checkOrCancel,
};


const columns: GridColDef[] = fields.map((field) => {
  const column: GridColDef = { field, headerName: field, flex: 1 };
  if (field in specialRenderCell) {
    column.renderCell = specialRenderCell[field];
  }
  return column;
});


const DarkDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell, .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  }
}))

export default function ServerList() {
  const [rows, setRows] = React.useState<ServerData[]>([])
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    getServerData().then((data) => {
      const dataWithIds = data.map((item) => ({ id: item.Name, ...item }))
      setRows(dataWithIds)
    })
  }, [])

  const filteredRows = rows.filter((row) => 
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <Box m={2}>
      <TextField 
        label="Search" 
        variant="outlined" 
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{marginBottom: 2, marginTop: 1, width: '100%'}}
      />
      <DarkDataGrid
      componentsProps={{
        toolbar: {
            showQuickFilter: true,
               quickFilterProps: { debounceMs: 500 },
         },
      }}
        rows={filteredRows}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        columns={columns}
        density='compact'
        disableColumnMenu
        disableRowSelectionOnClick
        autoHeight
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
      />
    </Box>
  )
}
