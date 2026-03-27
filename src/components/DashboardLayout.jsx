import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, Typography } from '@mui/material';
import { Sidebar, drawerWidth, fetchMenuFromAPI } from './Sidebar';

const DashboardLayout = () => {
  const [menuLoaded, setMenuLoaded] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      await fetchMenuFromAPI();
      setMenuLoaded(true);
    }
    loadMenu();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {!menuLoaded ? (
          <Typography>Cargando menú...</Typography>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
