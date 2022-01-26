import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

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
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={SidebarIsOpen} onClose={() => { setSidebarIsOpen(false) }}>
        <Sidebar />
      </Drawer>
    </Box>
  );
}

export default App;
