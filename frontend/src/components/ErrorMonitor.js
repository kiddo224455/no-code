import React, { useState, useEffect } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Logger from '../utils/logger';

const ErrorMonitor = () => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    Logger.initializeFromStorage();
    setErrors(Logger.getErrorHistory());

    const checkErrors = setInterval(() => {
      setErrors(Logger.getErrorHistory());
    }, 5000);

    return () => clearInterval(checkErrors);
  }, []);

  const handleClearErrors = () => {
    Logger.clearErrorHistory();
    setErrors([]);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title="Error Monitor">
        <IconButton
          color="error"
          onClick={toggleDrawer}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <Badge badgeContent={errors.length} color="error">
            <ErrorIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '400px',
            maxWidth: '90vw',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Error Monitor</Typography>
            <Box>
              <IconButton onClick={handleClearErrors} color="error" sx={{ mr: 1 }}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          {errors.length === 0 ? (
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              No errors recorded
            </Typography>
          ) : (
            <List>
              {errors.map((error, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={error.message}
                    secondary={
                      <>
                        <Typography variant="caption" display="block">
                          Time: {new Date(error.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          URL: {error.url}
                        </Typography>
                        {error.error?.stack && (
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{
                              whiteSpace: 'pre-wrap',
                              fontFamily: 'monospace',
                              fontSize: '0.7rem',
                              mt: 1,
                            }}
                          >
                            {error.error.stack}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ErrorMonitor; 