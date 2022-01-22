import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
interface Props {

}

const ToggleButton = () => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <MenuIcon />
    </IconButton>
  );
};

const App: React.FC<Props> = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <ToggleButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eiwan Challenge!
          </Typography>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
