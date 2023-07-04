import React, { useContext } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, TextField } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ServerDataContext from '../context/ServerDataContext.tsx';


const fields = ['Name', 'Map', 'MapSize', 'Gamemode', 'Region', 'Players', 'QueuePlayers', 'MaxPlayers', 'Hz', 'AntiCheat', 'Build', 'DayNight', 'IsOfficial', 'HasPassword']

const checkOrCancel = ({ value }: GridRenderCellParams) => value ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />;

interface SpecialRenderCell {
  [key: string]: (params: any) => JSX.Element;
}

const specialRenderCell: SpecialRenderCell = {
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

export default function ServerList() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const rows = useContext(ServerDataContext)

  // eslint-disable-next-line react/destructuring-assignment
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
        size="small"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{marginBottom: 2, marginTop: 1, width: '100%'}}
      />
      <DataGrid
        rows={filteredRows}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        columns={columns}
        density='compact'
        disableColumnMenu
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  )
}
