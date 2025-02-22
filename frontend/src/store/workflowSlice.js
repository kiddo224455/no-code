import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  isEditing: false,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex(node => node.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload && edge.target !== action.payload
      );
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  removeNode,
  setSelectedNode,
  setIsEditing,
} = workflowSlice.actions;

export default workflowSlice.reducer; 