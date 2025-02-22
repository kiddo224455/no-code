import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Workflow Builder
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<SaveIcon />}
            onClick={() => {/* TODO: Implement save workflow */}}
          >
            Save
          </Button>
          <Button
            color="inherit"
            startIcon={<PlayIcon />}
            onClick={() => {/* TODO: Implement run workflow */}}
          >
            Run
          </Button>
          <IconButton
            color="inherit"
            onClick={() => navigate('/settings')}
            size="large"
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 