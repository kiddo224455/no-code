import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as RunIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setWorkflows, setActiveWorkflow } from '../store/workflowSlice';

const WorkflowList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workflows = useSelector((state) => state.workflow.workflows);

  const handleCreateWorkflow = () => {
    navigate('/editor');
  };

  const handleEditWorkflow = (workflowId) => {
    navigate(`/editor/${workflowId}`);
  };

  const handleDeleteWorkflow = (workflowId) => {
    const updatedWorkflows = workflows.filter((w) => w.id !== workflowId);
    dispatch(setWorkflows(updatedWorkflows));
  };

  const handleRunWorkflow = (workflow) => {
    dispatch(setActiveWorkflow(workflow));
    // TODO: Implement workflow execution
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Workflows
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateWorkflow}
        >
          Create Workflow
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workflows.map((workflow) => (
          <Grid item xs={12} sm={6} md={4} key={workflow.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {workflow.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Created: {new Date(workflow.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" component="p">
                  {workflow.description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEditWorkflow(workflow.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleRunWorkflow(workflow)}
                >
                  <RunIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkflowList; 