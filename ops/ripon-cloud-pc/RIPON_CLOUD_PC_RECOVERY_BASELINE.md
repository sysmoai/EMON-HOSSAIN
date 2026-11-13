# RIPON-CLOUD-PC Recovery Baseline (2026-11-13, first session)
Status keys: VERIFIED / PARTIAL / BLOCKED / NOT_TESTED / FAILED. No secrets here.

## Host & access inventory
| Item | Status | Evidence |
|---|---|---|
| Claude Code host | VERIFIED | Anthropic cloud sandbox (Ubuntu 24.04.5), repo /home/user/EMON-HOSSAIN (Astro site). NOT the Windows PC, NOT RIPON-CLOUD-PC |
| gcloud authentication | BLOCKED | `gcloud auth list`: "No credentialed accounts" |
| GCP project sysmoai-private-limited | BLOCKED | `instances list` -> invalid credentials, 0 items (not proof the VM is absent) |
| Chrome / Cloud Console session | BLOCKED | No claude-in-chrome tools in this session; sandbox cannot see the CEO's browser |
| VM identity/zone/type/disks/firewall/IAM | NOT_TESTED | Needs GCP access |
| OS, desktop, RDP, services, RIPON START, Claude on VM | NOT_TESTED | Needs shell on VM |
| Backups, restore, hashes, SQLite | NOT_TESTED | Needs VM + backup destination |
| Cloudflare tunnel/Access | NOT_TESTED | Cloudflare MCP connector exists here, not yet checked |
| Billing/credits (USD 271.92 screenshot figure) | NOT_TESTED | Historical only |
| Cred-exposure mitigation (metadata server) | NOT_TESTED | Must be tested on VM |
| iPhone / office PC / Grok Bot / 24/7 jobs | NOT_TESTED | External devices/accounts |
| Repo `/home/user/EMON-HOSSAIN` | VERIFIED | Clean branch claude/vigilant-pasteur-hivljv; unrelated to workstation (website) |

## ChatGPT Work claims
All 17 reported-complete items: NOT_TESTED (unaudited screenshot claims).

## Outstanding blockers (exact)
1. Need a legitimate path to GCP: either run Claude Code ON ripon-cloud-pc-01 (preferred), or CEO runs `gcloud auth login` as a read-only/Viewer identity on a host I can use. No credential copying.
2. Chrome: connect the Claude in Chrome extension on the CEO's machine, or CEO performs Console checks.

## Next actions (when access exists)
Read-only: `gcloud compute instances list/describe` -> `hostnamectl; free -h; df -h; systemctl --failed; claude --version` -> locate RIPON START + systemd units + backup config -> fill CLOUD_INVENTORY / EXISTING_WORK_VERIFICATION -> security metadata test -> billing -> gaps only.
