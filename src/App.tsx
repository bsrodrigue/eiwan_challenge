import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Drawer, Divider, Avatar, ListItem, List, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
interface Props {

}

interface ToggleButtonProps {
  onClick: any;
}
const ToggleButton: React.FC<ToggleButtonProps> = (props: ToggleButtonProps) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <MenuIcon />
    </IconButton>
  );
};

const Sidebar: React.FC = () => {

  return (
    <Box sx={{ margin: "1em" }}>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar />
        <Typography>
          Young Flemmosian
        </Typography>
      </Box>

      <Divider />

      <List>
        {["Home", "Challenges", "Notifications", "Profile"].map((title, index) => {
          return (<ListItem button key={index}>
            <ListItemText>
              {title}
            </ListItemText>
          </ListItem>);
        })}
      </List>

    </Box>
  );
}

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
