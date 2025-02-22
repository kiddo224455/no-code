import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const SAMPLE_WORKFLOWS = [
  {
    id: 'sample-1',
    name: 'Data Processing Pipeline',
    description: 'A simple workflow for processing and transforming data',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    name: 'API Integration Flow',
    description: 'Connect and process data from external APIs',
    createdAt: new Date().toISOString(),
  },
];

const WorkflowList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[WorkflowList] Component mounted');
    console.log('[WorkflowList] Sample workflows:', SAMPLE_WORKFLOWS);
    return () => {
      console.log('[WorkflowList] Component unmounting');
    };
  }, []);

  const handleCreateWorkflow = () => {
    console.log('[WorkflowList] Creating new workflow');
    navigate('/editor');
  };

  const handleEditWorkflow = (workflowId) => {
    console.log('[WorkflowList] Opening workflow for editing:', workflowId);
    navigate(`/editor/${workflowId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mb: 6 
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2
          }}
        >
          No-Code Workflow Builder
        </Typography>
        <Typography 
          variant="h5" 
          color="textSecondary"
          sx={{ 
            maxWidth: 600,
            textAlign: 'center',
            mb: 4
          }}
        >
          Build powerful workflows without writing code. Connect APIs, transform data, and automate processes with our visual workflow builder.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleCreateWorkflow}
          sx={{ mb: 4 }}
        >
          Create New Workflow
        </Button>
      </Box>

      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Sample Workflows
      </Typography>

      <Grid container spacing={3}>
        {SAMPLE_WORKFLOWS.map((workflow) => (
          <Grid item xs={12} sm={6} md={4} key={workflow.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {workflow.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Created: {new Date(workflow.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  {workflow.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => handleEditWorkflow(workflow.id)}
                >
                  Open in Editor
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkflowList; 