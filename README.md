# No-Code Agentic Workflow Builder Platform

A powerful no-code platform that enables users to build agentic workflows through a visual drag-and-drop interface. This platform integrates with Hugging Face's smol agents and provides pre-built modules for advanced functionality.

## Features

- Visual drag-and-drop workflow builder
- 50+ pre-built integration widgets
- AI-powered nodes and modules
- Local development support
- Extensible node system

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker & Docker Compose (optional)

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd no-code-agent-builder
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Start the development servers:
```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm start
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Development

### Using Docker

```bash
# Build and run all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Project Structure

```
/no-code-agent-builder
├── /backend                 # Node.js/Express backend
├── /frontend               # React.js frontend
├── /docs                   # Documentation
├── docker-compose.yml      # Docker compose configuration
└── README.md              # This file
```

## Documentation

Detailed documentation can be found in the `/docs` directory:
- [MVP Development Document](docs/MVP_Development_Document.md)
- [API Documentation](docs/API.md)
- [Node Types](docs/Nodes.md)

## License

MIT 