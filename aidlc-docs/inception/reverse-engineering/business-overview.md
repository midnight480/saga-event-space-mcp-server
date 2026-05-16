# Business Overview

## Business Context Diagram
```mermaid
flowchart TD
    User["User/LLM (via MCP)"] --> MCPServer["Saga Event Space MCP Server"]
    MCPServer --> APIServer["Saga Event Space API (Worker)"]
    APIServer --> DB["Database / KV / R2"]
```

## Business Description
- **Business Description**: The system provides an MCP (Model Context Protocol) server that acts as a bridge between LLMs and the Saga Event Space API. It allows AI models to search for and manage event spaces, hotels, and venues in Saga Prefecture.
- **Business Transactions**: 
  - Venue Search & Retrieval
  - Venue Management (Create, Update, Delete)
  - Announcements Management
  - Release Notes Management
- **Business Dictionary**: 
  - MCP: Model Context Protocol
  - Place: Event space, hotel, or venue

## Component Level Business Descriptions
### saga-event-space-mcp-server
- **Purpose**: Provides tools to LLMs via MCP to interact with the Saga Event Space API.
- **Responsibilities**: Translate MCP tool calls into HTTP requests to the Saga Event Space API, handle authentication, and format API responses back to the LLM.
