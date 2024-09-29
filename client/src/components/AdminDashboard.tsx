// src/components/AdminDashboard.tsx
import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import "../styles/adminDashboard.css";

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/admin/users" sx={{ textDecoration: 'none' }}>
            <ListItemText primary="View Users" />
          </ListItem>
          <ListItem component={Link} to="/admin/trips" sx={{ textDecoration: 'none' }}>
            <ListItemText primary="View Trips" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet /> {/* The outlet for rendering users and trips content */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
