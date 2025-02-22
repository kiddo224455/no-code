import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import WorkflowEditor from './pages/WorkflowEditor';
import WorkflowList from './pages/WorkflowList';
import Settings from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

const App = () => {
  useEffect(() => {
    console.log('[App] Initializing application...');
    console.log('[App] Current environment:', process.env.NODE_ENV);
    console.log('[App] Public URL:', process.env.PUBLIC_URL);
  }, []);

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            mt: 8, // Space for navbar
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Routes>
            <Route path="/" element={<WorkflowList />} />
            <Route path="/editor" element={<WorkflowEditor />} />
            <Route path="/editor/:id" element={<WorkflowEditor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Box>
    </ErrorBoundary>
  );
};

export default App; 