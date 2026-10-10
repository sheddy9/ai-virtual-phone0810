# Float XHS MCP — independent Netlify service

Independent deployment lives under `mcp-service/` on `feature/xhs-mcp`, isolated from the existing Float app in `main`.

## Netlify setup
- Connect the **new** `float-xhs-mcp` Netlify project to GitHub repository `sheddy9/ai-virtual-phone0810`.
- Select deploy branch `feature/xhs-mcp` and **Base directory** `mcp-service`.
- No Next.js build; the build command is `echo Building isolated MCP service`, publish directory `public`, and functions directory `netlify/functions` relative to the base directory.
- Create a secret variable `MCP_KEY` with a strong random value, Functions scope, on the new project. Redeploy after adding it.
- Only after the secret exists and the function is deployed: remove Netlify SSO restriction for this **new project only**. Never change `noononone`.
- Endpoint: `https://float-xhs-mcp.netlify.app/.netlify/functions/xhs-mcp`.
- In Float, use **Direct mode** for browser-to-server requests and enter the same `MCP_KEY` as the Access Token. Do not append `/sse`.

## Status
This first bootstrap version exposes only `connection_test`. **It cannot read, comment, like or publish on Xiaohongshu.** Real read-only XHS tools will be implemented after connection succeeds and permission is checked. Do not provide XHS Cookie yet.

## Safety
No credential in source. Without `MCP_KEY`, POST requests fail closed (HTTP 503). A correct Bearer token is required for all MCP requests. The public GET health endpoint reports only generic status, not credentials. This is a personal, noncommercial experiment.
