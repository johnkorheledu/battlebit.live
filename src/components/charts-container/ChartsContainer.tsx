/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import GenericDistributionChart from '../data/map-distribution-list/distribution-chart.tsx';

interface ChartProps {
    dataKey: string;
    title: string;
    aggregatePlayers?: boolean;
}

interface ChartsContainerProps {
    heading: string;
    charts: ChartProps[];
}

function ChartsContainer({ heading, charts }: ChartsContainerProps) {
    return (
        <Box sx={{
            m: 2,
            borderRadius: 1,
            padding: 2,
            borderColor: 'rgba(81, 81, 81, 1)',
            borderStyle: 'solid',
            borderWidth: '0.5px'
        }}>
            <Typography variant='h5' color="#fff" mb={2} mt={2}>{heading}</Typography>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" margin="auto">
                {charts.map((chart, index) => (
                    <Box flex="1" display="flex" flexDirection="column" marginRight="16px">
                        <GenericDistributionChart {...chart} key={index} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ChartsContainer;