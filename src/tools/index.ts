import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SagaEventSpaceApiClient } from "../api-client.js";

// Import existing tools
import { registerSearchTools } from "./search.js";
import { registerPlaceTools } from "./places.js";
import { registerAnnouncementTools } from "./announcements.js";
import { registerReleaseNoteTools } from "./release-notes.js";

// Import new Unit 2 tools
import { registerAuditLogsTools } from "./audit-logs.js";
import { registerDeletionRequestsTools } from "./deletion-requests.js";
import { registerDuplicatesTools } from "./duplicates.js";

// Import new Unit 3 tools
import { registerUsersTools } from "./users.js";
import { registerTokensTools } from "./tokens.js";

// Import new Unit 4 tools
import { registerAddressTools } from "./address.js";
import { registerGeocodingTools } from "./geocoding.js";
import { registerUploadsTools } from "./uploads.js";

/**
 * Register all available tools to the MCP Server
 */
export function registerAllTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  // Original Tools
  registerSearchTools(server, apiClient);
  registerPlaceTools(server, apiClient);
  registerAnnouncementTools(server, apiClient);
  registerReleaseNoteTools(server, apiClient);

  // Administrative Tools (Unit 2)
  registerAuditLogsTools(server, apiClient);
  registerDeletionRequestsTools(server, apiClient);
  registerDuplicatesTools(server, apiClient);

  // User & Auth Tools (Unit 3)
  registerUsersTools(server, apiClient);
  registerTokensTools(server, apiClient);

  // Utility Tools (Unit 4)
  registerAddressTools(server, apiClient);
  registerGeocodingTools(server, apiClient);
  registerUploadsTools(server, apiClient);
}
