import * as React from 'react';
import  {useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import {logout} from '../../firebase-config'
import { useEffect } from 'react';



export default function NavBar() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Button color="inherit" href="/search">
            Search Movies
            </Button>
              <Button color="inherit" href="/dashboard">
                Dashboard
              </Button>
            <Button color="inherit" onClick ={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}