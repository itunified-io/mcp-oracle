import { z } from "zod";
import type { ToolDefinition } from "./plugin.js";

// ─── Oracle Read-Only Database Operations (28 tools) ────────────────
// Maps 1:1 to dbxcli db <group> <action> --format json

const target = z.string().describe("Target name from ~/.dbx/targets/");

export const tools: ToolDefinition[] = [
  // ── Session (3 tools) ──────────────────────────────────────────────
  {
    name: "oracle_session_list",
    description: "List active database sessions with SID, serial#, username, status, program, machine, SQL ID, and wait event",
    inputSchema: {
      target,
      username: z.string().optional().describe("Filter by username"),
      status: z.enum(["ACTIVE", "INACTIVE"]).optional().describe("Filter by session status"),
    },
    domain: "db",
    action: "session list",
  },
  {
    name: "oracle_session_describe",
    description: "Detailed information about a specific session including SQL text, wait event, blocking session, and resource usage",
    inputSchema: {
      target,
      sid: z.string().describe("Session ID (SID)"),
      serial: z.string().describe("Session serial number"),
    },
    domain: "db",
    action: "session describe",
  },
  {
    name: "oracle_session_top_waiters",
    description: "Top sessions by wait time — identifies sessions consuming the most resources or blocking others",
    inputSchema: {
      target,
      top_n: z.number().min(1).max(100).default(10).optional().describe("Number of results"),
    },
    domain: "db",
    action: "session top-waiters",
  },

  // ── Tablespace (4 tools) ───────────────────────────────────────────
  {
    name: "oracle_tablespace_list",
    description: "List all tablespaces with status, type (permanent/temporary/undo), size, used, free, and percent used",
    inputSchema: { target },
    domain: "db",
    action: "tablespace list",
  },
  {
    name: "oracle_tablespace_describe",
    description: "Detailed tablespace information including datafiles, autoextend settings, block size, and segment space management",
    inputSchema: {
      target,
      name: z.string().describe("Tablespace name"),
    },
    domain: "db",
    action: "tablespace describe",
  },
  {
    name: "oracle_tablespace_usage_summary",
    description: "Tablespace usage summary across all tablespaces — highlights those approaching capacity thresholds",
    inputSchema: {
      target,
      threshold: z.number().min(0).max(100).default(85).optional().describe("Warning threshold percent"),
    },
    domain: "db",
    action: "tablespace usage-summary",
  },
  {
    name: "oracle_tablespace_free_space",
    description: "Free space details per tablespace including largest free extent and fragment count",
    inputSchema: {
      target,
      name: z.string().optional().describe("Tablespace name (all if omitted)"),
    },
    domain: "db",
    action: "tablespace free-space",
  },

  // ── User (5 tools) ────────────────────────────────────────────────
  {
    name: "oracle_user_list",
    description: "List database users with status (OPEN/LOCKED/EXPIRED), default tablespace, profile, and creation date",
    inputSchema: {
      target,
      status: z.string().optional().describe("Filter by account status"),
    },
    domain: "db",
    action: "user list",
  },
  {
    name: "oracle_user_describe",
    description: "Detailed user profile including tablespace quotas, granted roles, system privileges, and account status",
    inputSchema: {
      target,
      username: z.string().describe("Database username"),
    },
    domain: "db",
    action: "user describe",
  },
  {
    name: "oracle_user_privileges",
    description: "All privileges granted to a user — system privileges, object privileges, and role-inherited privileges",
    inputSchema: {
      target,
      username: z.string().describe("Database username"),
    },
    domain: "db",
    action: "user privileges",
  },
  {
    name: "oracle_user_roles",
    description: "Roles granted to a user with admin option flag and default role status",
    inputSchema: {
      target,
      username: z.string().describe("Database username"),
    },
    domain: "db",
    action: "user roles",
  },
  {
    name: "oracle_user_profile",
    description: "Profile resource limits and password policy for a user's assigned profile",
    inputSchema: {
      target,
      username: z.string().describe("Database username"),
    },
    domain: "db",
    action: "user profile",
  },

  // ── Parameter (4 tools) ────────────────────────────────────────────
  {
    name: "oracle_parameter_list",
    description: "List initialization parameters with current values, default flag, and whether modifiable at session/system level",
    inputSchema: {
      target,
      filter: z.string().optional().describe("Filter by parameter name pattern"),
    },
    domain: "db",
    action: "parameter list",
  },
  {
    name: "oracle_parameter_describe",
    description: "Detailed parameter info: value, default, range, description, modifiable scope, and PDB-modifiable flag",
    inputSchema: {
      target,
      name: z.string().describe("Parameter name"),
    },
    domain: "db",
    action: "parameter describe",
  },
  {
    name: "oracle_parameter_modified",
    description: "Parameters modified from their default values — useful for configuration review and drift detection",
    inputSchema: { target },
    domain: "db",
    action: "parameter modified",
  },
  {
    name: "oracle_parameter_hidden",
    description: "Hidden (underscore) parameters with current values — for advanced diagnostics only",
    inputSchema: {
      target,
      filter: z.string().optional().describe("Filter pattern"),
    },
    domain: "db",
    action: "parameter hidden",
  },

  // ── Redo Log (3 tools) ─────────────────────────────────────────────
  {
    name: "oracle_redo_list",
    description: "List redo log groups with members, size, sequence number, status (CURRENT/ACTIVE/INACTIVE), and archived flag",
    inputSchema: { target },
    domain: "db",
    action: "redo list",
  },
  {
    name: "oracle_redo_status",
    description: "Current redo log status including active group, sequence, archiver status, and log switch frequency",
    inputSchema: { target },
    domain: "db",
    action: "redo status",
  },
  {
    name: "oracle_redo_switch_frequency",
    description: "Redo log switch frequency over time — helps size redo logs and detect excessive switching",
    inputSchema: {
      target,
      hours: z.number().min(1).max(168).default(24).optional().describe("Lookback hours"),
    },
    domain: "db",
    action: "redo switch-frequency",
  },

  // ── Datafile (3 tools) ─────────────────────────────────────────────
  {
    name: "oracle_datafile_list",
    description: "List all datafiles with tablespace, size, used, free, autoextend, and max size",
    inputSchema: { target },
    domain: "db",
    action: "datafile list",
  },
  {
    name: "oracle_datafile_describe",
    description: "Detailed datafile info: path, tablespace, status, checkpoint, I/O statistics",
    inputSchema: {
      target,
      file_id: z.string().describe("Datafile ID or full path"),
    },
    domain: "db",
    action: "datafile describe",
  },
  {
    name: "oracle_datafile_io_stats",
    description: "I/O statistics per datafile: physical reads/writes, read/write time, average I/O time",
    inputSchema: { target },
    domain: "db",
    action: "datafile io-stats",
  },

  // ── SQL (2 tools) ──────────────────────────────────────────────────
  {
    name: "oracle_sql_execute_readonly",
    description: "Execute a read-only SQL query (SELECT only) and return results. DML/DDL is rejected by the ReadOnlyGuard",
    inputSchema: {
      target,
      sql: z.string().describe("SQL SELECT statement to execute"),
      max_rows: z.number().min(1).max(10000).default(100).optional().describe("Maximum rows to return"),
    },
    domain: "db",
    action: "sql execute-readonly",
  },
  {
    name: "oracle_sql_explain_plan",
    description: "Generate execution plan for a SQL statement without executing it — shows access paths, join methods, costs",
    inputSchema: {
      target,
      sql: z.string().describe("SQL statement to explain"),
    },
    domain: "db",
    action: "sql explain-plan",
  },

  // ── Alert Log (2 tools) ────────────────────────────────────────────
  {
    name: "oracle_alert_log_tail",
    description: "Tail the alert log — shows recent entries including ORA- errors, log switches, and checkpoint info",
    inputSchema: {
      target,
      lines: z.number().min(1).max(1000).default(50).optional().describe("Number of lines to return"),
    },
    domain: "db",
    action: "advisor alert-tail",
  },
  {
    name: "oracle_alert_log_search",
    description: "Search alert log for specific patterns (e.g., ORA- errors, checkpoint, shutdown) within a time range",
    inputSchema: {
      target,
      pattern: z.string().describe("Search pattern (e.g., 'ORA-', 'checkpoint')"),
      hours: z.number().min(1).max(720).default(24).optional().describe("Lookback hours"),
    },
    domain: "db",
    action: "advisor alert-search",
  },

  // ── SGA (2 tools) ──────────────────────────────────────────────────
  {
    name: "oracle_sga_summary",
    description: "SGA memory summary: total size, free, buffer cache, shared pool, large pool, java pool, streams pool",
    inputSchema: { target },
    domain: "db",
    action: "advisor sga-summary",
  },
  {
    name: "oracle_sga_components",
    description: "Detailed SGA component breakdown with current size, min/max, granule size, and resize operations",
    inputSchema: { target },
    domain: "db",
    action: "advisor sga-components",
  },

  // ── PGA (2 tools) ──────────────────────────────────────────────────
  {
    name: "oracle_pga_summary",
    description: "PGA memory summary: aggregate target, allocated, maximum, cache hit ratio, over-allocation count",
    inputSchema: { target },
    domain: "db",
    action: "advisor pga-summary",
  },
  {
    name: "oracle_pga_work_areas",
    description: "Active PGA work areas: SQL operation, policy, estimated/actual size, passes, tempseg size",
    inputSchema: { target },
    domain: "db",
    action: "advisor pga-workareas",
  },
];
