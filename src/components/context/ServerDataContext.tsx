/* eslint-disable react/function-component-definition */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { ServerData, getServerData } from '../../api/servers.ts';


const ServerDataContext = createContext<ServerData[]>([]);

export const ServerDataProvider: React.FC<object> = ({ children }) => {
  const [serverData, setServerData] = useState<ServerData[]>([]);


  const fetchData = () => {
    getServerData().then((data) => {
      const dataWithIds = data.map((item, index) => ({ id: item.Name, ...item }));
      setServerData(dataWithIds);
    });
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ServerDataContext.Provider value={serverData}>
      {children}
    </ServerDataContext.Provider>
  );
}

export const useServerData = () => useContext(ServerDataContext);

export default ServerDataContext;
