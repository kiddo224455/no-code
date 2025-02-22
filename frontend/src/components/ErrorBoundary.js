import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Logger from '../utils/logger';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    Logger.logError('React Error Boundary', {
      error,
      errorInfo,
      component: errorInfo.componentStack
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            The application encountered an unexpected error.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
            sx={{ mt: 2 }}
          >
            Reset Application
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 4, textAlign: 'left', maxWidth: '800px' }}>
              <Typography variant="h6" gutterBottom>
                Error Details:
              </Typography>
              <pre style={{ overflow: 'auto', maxHeight: '200px' }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 