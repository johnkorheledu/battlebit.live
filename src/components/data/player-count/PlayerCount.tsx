/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material'
import ServerDataContext from '../../context/ServerDataContext.tsx';

export default function PlayerCount() {
    const serverData = useContext(ServerDataContext)

    const [totalPlayers, setTotalPlayers] = useState(0);

    useEffect(() => {
        let count = 0;
        serverData.forEach(server => {
            count += server.Players;
        });
        setTotalPlayers(count);

    }, [serverData])


    return (
        <Typography variant='h6' color="white" fontSize="0.875rem" ml={1.5}>Current Players: {totalPlayers}</Typography>
    );
}
