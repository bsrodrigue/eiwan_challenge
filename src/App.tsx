import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Sidebar, ToggleButton } from './global/components';
import { useCookies } from 'react-cookie';


interface Props { }
const App: React.FC<Props> = () => {
  // States
  const [SidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  // Hooks
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const navigate = useNavigate();

  // Values
  const token = cookies?.auth?.session?.access_token;
  const user = cookies?.auth?.user;
  const profile = cookies?.auth?.profile;

  const isAuthenticated = token;


  const logout = () => {
    removeCookie("auth", { path: "/" });
    navigate("/auth/login");
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <ToggleButton onClick={() => { setSidebarIsOpen(true) }} />
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Eiwan Challenge!
          </Typography>


          {
            isAuthenticated ? (
              <>
                <Button onClick={logout} color="inherit">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/auth/register">
                  <Button color="inherit">Register</Button>
                </Link>
                <Link to="/auth/login">
                  <Button color="inherit">Login</Button>
                </Link>
              </>
            )
          }

        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={SidebarIsOpen} onClose={() => {
        setSidebarIsOpen(false)
      }}>
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
