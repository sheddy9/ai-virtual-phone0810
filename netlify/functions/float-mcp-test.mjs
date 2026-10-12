// Safe read-only MCP connectivity probe for Float / Netlify.
// No Xiaohongshu credentials, cookies, write tools, or external requests.
// Deploy Preview probe: requires FLOAT_MCP_TEST_TOKEN in Netlify Functions environment.
const protocolVersion = "2025-03-26";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, WWW-Authenticate",
  "Access-Control-Max-Age": "86400",
};
const json = (id, result) => ({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });
const reply = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cors },
});
export default async function handler(request) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method === "GET") return reply({ status: "ready", server: "float-mcp-connection-test", auth_required: true, note: "No Xiaohongshu access; no write tools." });
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const expected = process.env.FLOAT_MCP_TEST_TOKEN;
  if (!expected) return reply({ error: "Server is not configured" }, 503);
  if (request.headers.get("Authorization") !== `Bearer ${expected}`) return reply({ error: "Unauthorized" }, 401);
  let payload;
  try { payload = await request.json(); } catch { return reply(fail(null, -32700, "Invalid JSON"), 400); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return reply(fail(null, -32600, "Invalid request"), 400);
  const { id, method, params } = payload;
  if (typeof method !== "string") return reply(fail(id ?? null, -32600, "Invalid request"), 400);
  // JSON-RPC notifications have no id and must not be answered.
  if (id === undefined) return new Response(null, { status: 202 });
  switch (method) {
    case "initialize":
      return reply(json(id, { protocolVersion: typeof params?.protocolVersion === "string" ? params.protocolVersion : protocolVersion, capabilities: { tools: {} }, serverInfo: { name: "float-mcp-connection-test", version: "0.1.0" } }));
    case "ping": return reply(json(id, {}));
    case "tools/list": return reply(json(id, { tools: [{
      name: "connection_test",
      description: "Checks that Float can call a protected Netlify MCP endpoint. Does not contact Xiaohongshu.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false }
    }] }));
    case "tools/call":
      return params?.name === "connection_test"
        ? reply(json(id, { content: [{ type: "text", text: "Float and the Netlify MCP test endpoint are connected. No Xiaohongshu action was performed." }] }))
        : reply(fail(id, -32602, "Unknown tool"), 400);
    default: return reply(fail(id, -32601, "Method not found"), 400);
  }
};
export const config = { path: "/.netlify/functions/float-mcp-test" };
