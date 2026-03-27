import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from '../components/Sidebar';
import Topbar from './Topbar';

/**
 * MainLayout combines Sidebar, Topbar, and main content area.
 * Responsive: Sidebar is permanent on desktop, collapsible on mobile.
 */
const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Toolbar /> {/* Spacer for AppBar */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f6fa' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
