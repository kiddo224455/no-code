import React from 'react';
import { Box } from '@mui/material';
import WorkflowEditor from './pages/WorkflowEditor';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Box sx={{ height: '100vh', display: 'flex' }}>
        <WorkflowEditor />
      </Box>
    </ErrorBoundary>
  );
};

export default App; 