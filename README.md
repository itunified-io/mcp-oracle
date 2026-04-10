# @itunified.io/mcp-oracle

> dbx MCP Oracle adapter — read-only database operations

[![npm](https://img.shields.io/npm/v/@itunified.io/mcp-oracle)](https://www.npmjs.com/package/@itunified.io/mcp-oracle)
[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)

Part of the [dbx multi-database management platform](https://github.com/itunified-io/dbx) — a thin TypeScript MCP adapter wrapping `dbxcli` via `execFile`. The Go binary handles connection, license, gates, audit, and execution.

## Architecture

```
LLM <-> MCP Protocol <-> This Adapter <-> execFile("dbxcli") <-> Oracle Database
```

- **Layer 0**: `dbxcli` Go binary (works without AI)
- **Layer 1**: This MCP adapter (TypeScript, Zod schemas, MCP protocol)
- **Layer 2**: AI skills (Claude Code, IDE integrations)

## Prerequisites

- Node.js >= 20.0.0
- `dbxcli` binary on PATH (from [dbx](https://github.com/itunified-io/dbx))
- At least one target configured: `dbxcli target add <name> --host <host> --port <port> --service <service>`

## Installation

```bash
npm install -g @itunified.io/mcp-oracle
```

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "oracle": {
      "command": "npx",
      "args": ["-y", "@itunified.io/mcp-oracle"]
    }
  }
}
```

## Tools (28)

### Session (3)

| Tool | Description |
|------|-------------|
| `oracle_session_list` | List active database sessions |
| `oracle_session_describe` | Detailed session information |
| `oracle_session_top_waiters` | Top sessions by wait time |

### Tablespace (4)

| Tool | Description |
|------|-------------|
| `oracle_tablespace_list` | List all tablespaces with usage |
| `oracle_tablespace_describe` | Detailed tablespace info |
| `oracle_tablespace_usage_summary` | Usage summary with thresholds |
| `oracle_tablespace_free_space` | Free space and fragmentation |

### User (5)

| Tool | Description |
|------|-------------|
| `oracle_user_list` | List database users |
| `oracle_user_describe` | Detailed user profile |
| `oracle_user_privileges` | All granted privileges |
| `oracle_user_roles` | Granted roles |
| `oracle_user_profile` | Profile resource limits |

### Parameter (4)

| Tool | Description |
|------|-------------|
| `oracle_parameter_list` | List initialization parameters |
| `oracle_parameter_describe` | Detailed parameter info |
| `oracle_parameter_modified` | Non-default parameters |
| `oracle_parameter_hidden` | Hidden underscore parameters |

### Redo Log (3)

| Tool | Description |
|------|-------------|
| `oracle_redo_list` | List redo log groups |
| `oracle_redo_status` | Current redo log status |
| `oracle_redo_switch_frequency` | Log switch frequency analysis |

### Datafile (3)

| Tool | Description |
|------|-------------|
| `oracle_datafile_list` | List all datafiles |
| `oracle_datafile_describe` | Detailed datafile info |
| `oracle_datafile_io_stats` | I/O statistics per datafile |

### SQL (2)

| Tool | Description |
|------|-------------|
| `oracle_sql_execute_readonly` | Execute read-only SELECT query |
| `oracle_sql_explain_plan` | Generate execution plan |

### Alert Log (2)

| Tool | Description |
|------|-------------|
| `oracle_alert_log_tail` | Tail recent alert log entries |
| `oracle_alert_log_search` | Search alert log by pattern |

### SGA (2)

| Tool | Description |
|------|-------------|
| `oracle_sga_summary` | SGA memory summary |
| `oracle_sga_components` | Detailed SGA components |

### PGA (2)

| Tool | Description |
|------|-------------|
| `oracle_pga_summary` | PGA memory summary |
| `oracle_pga_work_areas` | Active PGA work areas |

## Skills

| Skill | Slash Command | Description |
|-------|--------------|-------------|
| Oracle Health | `/ora-health` | Comprehensive database health check |
| Oracle Info | `/ora-info` | Database overview and configuration |
| Oracle Test | `/ora-test` | Live test all tools against a target |
| Oracle Explore | `/ora-explore` | Interactive database exploration |

## Configuration

All configuration is managed by `dbxcli`:

- **Targets**: `~/.dbx/targets/` (connection details)
- **License**: `~/.dbx/license.jwt` (JWT token)
- **Config**: `~/.dbx/config.yaml` (global settings)

## License

AGPL-3.0 — see [LICENSE](LICENSE) for details.

---

Built by [ITUNIFIED GmbH](https://itunified.io) | Part of the [dbx ecosystem](https://github.com/itunified-io/dbx)
