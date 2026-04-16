import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { server } from "../src/server.js";

const app = express();

// Set transport type for src/server.ts to avoid starting Stdio
process.env.MCP_TRANSPORT = "sse";

let transport: SSEServerTransport | null = null;

app.get("/api/sse", async (req, res) => {
  console.log("New SSE connection");
  transport = new SSEServerTransport("/api/messages", res);
  await server.connect(transport);
  
  // Clean up when connection closes
  req.on("close", () => {
    console.log("SSE connection closed");
    transport = null;
  });
});

app.post("/api/messages", express.json(), async (req, res) => {
  console.log("Received message");
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send("No active SSE connection. Connect to /api/sse first.");
  }
});

export default app;
