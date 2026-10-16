import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const dataDir = path.resolve(__dirname, "data")
const dataFile = path.join(dataDir, "submissions.json")

function readSubs(): unknown[] {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf-8"))
  } catch {
    return []
  }
}

function writeSubs(subs: unknown[]) {
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(dataFile, JSON.stringify(subs, null, 2), "utf-8")
}

// 简易共享数据接口：所有通过链接访问的学生共用 data/submissions.json
function submissionsApi(): Plugin {
  return {
    name: "submissions-api",
    configureServer(server) {
      server.middlewares.use("/api/submissions", (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8")
        if (req.method === "GET") {
          res.end(JSON.stringify(readSubs()))
        } else if (req.method === "POST") {
          let body = ""
          req.on("data", (c: Buffer) => (body += c))
          req.on("end", () => {
            try {
              const item = JSON.parse(body)
              const subs = readSubs() as Array<{ id?: string }>
              // 同一班级+组长学号重复提交时覆盖（允许修改）
              const idx = subs.findIndex(
                (s) => s.id === item.id
              )
              if (idx >= 0) subs[idx] = item
              else subs.push(item)
              writeSubs(subs)
              res.end(JSON.stringify({ ok: true, id: item.id }))
            } catch (e) {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: String(e) }))
            }
          })
        } else if (req.method === "DELETE") {
          const url = new URL(req.url ?? "", "http://x")
          const id = url.searchParams.get("id")
          const subs = readSubs() as Array<{ id?: string }>
          writeSubs(id ? subs.filter((s) => s.id !== id) : [])
          res.end(JSON.stringify({ ok: true }))
        } else {
          res.statusCode = 405
          res.end(JSON.stringify({ ok: false }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), submissionsApi()],
  server: {
    port: 3000,
    host: true, // 允许局域网内其他设备访问
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
