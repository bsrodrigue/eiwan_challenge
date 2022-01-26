import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Sidebar, ToggleButton } from './global/components';


interface Props { }
const App: React.FC<Props> = () => {
  // States
  const [SidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);


  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <ToggleButton onClick={() => { setSidebarIsOpen(true) }} />
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Eiwan Challenge!
          </Typography>
          <Link to="/auth/register">
            <Button color="inherit">Register</Button>
          </Link>
          <Link to="/auth/login">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={SidebarIsOpen} onClose={() => { setSidebarIsOpen(false) }}>
        <Sidebar />
      </Drawer>

      {/* Page Content */}
      <Box sx={{ padding: 1 }}>
        <Outlet />
      </Box>


    </Box>
  );
}

export default App;
