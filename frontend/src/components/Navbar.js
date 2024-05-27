import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({selectedItem}) => {
  return (
    <Toolbar sx={{  width: '100%' }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {selectedItem}
      </Typography>

      <Stack direction="row" spacing={1}>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

export default Navbar;