import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {createTheme, ThemeProvider, styled, Box } from '@mui/material';

import { ServerData, getServerData } from '../../api/servers';

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
    { field: 'DayNight', headerName: 'Day/Night' },
    { field: 'IsOfficial', headerName: 'Official' },
    { field: 'HasPassword', headerName: 'Password' },
    { field: 'AntiCheat', headerName: 'Anti Cheat' },
    { field: 'Build', headerName: 'Build', flex: 2},
];

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
  }));

export default function ServerList() {
    const [rows, setRows] = React.useState<ServerData[]>([]);
  
    React.useEffect(() => {
      getServerData().then(data => {
        const dataWithIds = data.map(item => ({ id: item.Name, ...item }));
        setRows(dataWithIds);
      });
    }, []);
  
    return (
        <Box m={2}>
        <DarkDataGrid rows={rows} columns={columns} density='compact' disableColumnMenu/>
</Box>
);
  }
