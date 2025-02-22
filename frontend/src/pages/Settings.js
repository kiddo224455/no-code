import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Box,
  Alert,
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    apiEndpoint: 'http://localhost:5000',
    autoSave: true,
    saveInterval: 5,
    theme: 'light',
    notifications: true,
    telemetry: true,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings((prev) => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement settings save
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="API Endpoint"
            name="apiEndpoint"
            value={settings.apiEndpoint}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.autoSave}
                onChange={handleChange}
                name="autoSave"
              />
            }
            label="Auto Save"
          />
          {settings.autoSave && (
            <TextField
              type="number"
              label="Save Interval (minutes)"
              name="saveInterval"
              value={settings.saveInterval}
              onChange={handleChange}
              margin="normal"
              sx={{ ml: 3 }}
            />
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.theme === 'dark'}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'theme',
                      value: e.target.checked ? 'dark' : 'light',
                    },
                  })
                }
              />
            }
            label="Dark Theme"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={handleChange}
                name="notifications"
              />
            }
            label="Enable Notifications"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Privacy
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.telemetry}
                onChange={handleChange}
                name="telemetry"
              />
            }
            label="Share Usage Data"
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings; 