# Changelog

All notable changes to this project will be documented in this file.

## v2026.4.10.1

- feat: initial release — 28 read-only Oracle MCP tools
- feat: session tools (list, describe, top_waiters)
- feat: tablespace tools (list, describe, usage_summary, free_space)
- feat: user tools (list, describe, privileges, roles, profile)
- feat: parameter tools (list, describe, modified, hidden)
- feat: redo log tools (list, status, switch_frequency)
- feat: datafile tools (list, describe, io_stats)
- feat: SQL tools (execute_readonly, explain_plan)
- feat: alert log tools (tail, search)
- feat: SGA tools (summary, components)
- feat: PGA tools (summary, work_areas)
- feat: shared dbxExec() executor via execFile (no shell injection)
- feat: McpRuntime with stdio + SSE transport
- feat: ADR-0026 prepublish security scan
