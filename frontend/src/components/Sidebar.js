import React from 'react';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import {
  Input as InputIcon,
  Output as OutputIcon,
  Transform as TransformIcon,
  Code as CodeIcon,
  DataObject as DataIcon,
} from '@mui/icons-material';

const nodeTypes = [
  { type: 'input', label: 'Input', icon: InputIcon },
  { type: 'output', label: 'Output', icon: OutputIcon },
  { type: 'transform', label: 'Transform', icon: TransformIcon },
  { type: 'function', label: 'Function', icon: CodeIcon },
  { type: 'data', label: 'Data', icon: DataIcon },
];

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper
      sx={{
        width: 240,
        height: '100%',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Nodes</Typography>
      </Box>
      <List>
        {nodeTypes.map(({ type, label, icon: Icon }) => (
          <ListItem
            key={type}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
            sx={{
              cursor: 'grab',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
            }}
          >
            <Icon />
            <Typography>{label}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar; 