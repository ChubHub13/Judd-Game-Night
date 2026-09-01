const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const chatFile = path.join(root, "data", "chat.json");
const mime = { ".html":"text/html; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".json":"application/json; charset=utf-8", ".svg":"image/svg+xml" };

function readChat() {
  try { return JSON.parse(fs.readFileSync(chatFile, "utf8")); } catch { return []; }
}
function writeChat(messages) {
  fs.mkdirSync(path.dirname(chatFile), { recursive: true });
  fs.writeFileSync(chatFile, JSON.stringify(messages.slice(-150), null, 2));
}
function json(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(value));
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api/chat" && req.method === "GET") return json(res, 200, readChat());
  if (url.pathname === "/api/chat" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; if (body.length > 2048) req.destroy(); });
    req.on("end", () => {
      try {
        const { name, text } = JSON.parse(body);
        const cleanName = String(name || "Guest").trim().slice(0, 28) || "Guest";
        const cleanText = String(text || "").trim().slice(0, 240);
        if (!cleanText) return json(res, 400, { error: "A message is required." });
        const messages = readChat();
        messages.push({ id: Date.now(), name: cleanName, text: cleanText, at: new Date().toISOString() });
        writeChat(messages);
        json(res, 201, messages);
      } catch { json(res, 400, { error: "Invalid message." }); }
    });
    return;
  }
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const file = path.resolve(root, "." + requested);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end("Not found"); }
  res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(process.env.PORT || 8080, () => console.log("Judd Game Night: http://127.0.0.1:8080"));
