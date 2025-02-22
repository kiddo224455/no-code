import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import { setNodes, addNode } from '../store/workflowSlice';
import Logger from '../utils/logger';
import Sidebar from '../components/Sidebar';

const nodeTypes = {
  // Custom node types will be defined here
};

const WorkflowEditor = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.workflow.nodes);
  const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    try {
      setReactFlowNodes(nodes);
      Logger.debug('Nodes updated', nodes);
    } catch (err) {
      Logger.error('Failed to update nodes', err);
      setError('Failed to update workflow nodes');
    }
  }, [nodes, setReactFlowNodes]);

  const onConnect = useCallback(
    (params) => {
      try {
        setEdges((eds) => {
          const newEdges = addEdge(params, eds);
          Logger.logEdgeOperation('connect', { params, newEdges });
          return newEdges;
        });
      } catch (err) {
        Logger.error('Failed to connect nodes', err);
        setError('Failed to connect nodes');
      }
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      try {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (!type) {
          Logger.warn('Invalid node type on drop');
          return;
        }

        const position = {
          x: event.clientX - event.target.getBoundingClientRect().left,
          y: event.clientY - event.target.getBoundingClientRect().top,
        };

        const newNode = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: { label: `${type} node` },
        };

        Logger.logNodeOperation('add', newNode);
        dispatch(addNode(newNode));
      } catch (err) {
        Logger.error('Failed to add node', err);
        setError('Failed to add node to workflow');
      }
    },
    [dispatch]
  );

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'background.default',
          }}
        >
          <ReactFlow
            nodes={reactFlowNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </Paper>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WorkflowEditor; 