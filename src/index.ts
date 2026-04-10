#!/usr/bin/env node
import { createMcpRuntime } from "./runtime.js";
import { createPlugin } from "./plugin.js";
import { tools } from "./tools.js";

const NAME = "mcp-oracle";
const VERSION = "2026.4.10.1";

const useSSE = process.argv.includes("--sse");
const port = parseInt(process.env.MCP_PORT ?? "3100", 10);

const runtime = createMcpRuntime({
  name: NAME,
  version: VERSION,
  transport: useSSE ? "sse" : "stdio",
  port,
});

const plugin = createPlugin({
  name: "oracle",
  domain: "db",
  requiredBundle: "free",
  tools,
});

plugin.register(runtime);

runtime.start().catch((err: unknown) => {
  console.error("Fatal:", err);
  process.exit(1);
});
