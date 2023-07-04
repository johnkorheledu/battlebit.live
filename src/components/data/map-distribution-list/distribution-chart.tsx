/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@mui/material'
import ServerDataContext from '../../context/ServerDataContext.tsx';


ChartJS.register(ArcElement, Tooltip);

const generateDistinctColors = (numColors: number) => {
  const predefinedColors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
    '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff',
    '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
    '#000075', '#808080', '#ffffff', '#000000'
  ];

  const colors = predefinedColors.slice(0, numColors);
  return colors;
};


function GenericDistributionChart({ dataKey, title, aggregatePlayers = false }: { dataKey: string, title: string, aggregatePlayers?: boolean }) {
  const serverData = useContext(ServerDataContext)

  const chartData: { [key: string]: number } = serverData.reduce((acc: { [key: string]: number }, server: { [key: string]: any; }) => {
    const key = server[dataKey];
    if (!acc[key]) {
      acc[key] = aggregatePlayers ? server.Players : 1;
    } else {
      acc[key] += aggregatePlayers ? server.Players : 1;
    }
    return acc;
  }, {});
  
  const labels: string[] = Object.keys(chartData);
  const datasetData: number[] = Object.values(chartData);

  const uniqueItems = new Set(serverData.map(server => server[dataKey]));
  const numColors = uniqueItems.size;
  const colors = React.useMemo(() => generateDistinctColors(numColors), [numColors]);
  
  const data: { labels: string[], datasets: { data: number[], backgroundColor: string[] }[] } = {
    labels,
    datasets: [
      {
        data: datasetData,
        backgroundColor: colors
      },
    ],
  };
  

  return (
    <>
      <Typography variant="h6" color="#fff" align="center" mb={2}>
        {title}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', height: '400px' }}>
        <Doughnut data={data} />
      </div>
    </>
  );
}

export default GenericDistributionChart;