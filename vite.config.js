import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import briefHandler from './api/brief.js'

function localBriefApi() {
  return {
    name: 'local-brief-api',
    configureServer(server) {
      server.middlewares.use('/api/brief', async (req, res, next) => {
        res.status = (statusCode) => {
          res.statusCode = statusCode
          return res
        }
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(payload))
          return res
        }

        let rawBody = ''
        try {
          for await (const chunk of req) {
            rawBody += chunk
            if (rawBody.length > 12_000) {
              return res.status(413).json({ error: 'Your brief is too large. Please shorten it and try again.' })
            }
          }
          req.body = rawBody ? JSON.parse(rawBody) : {}
          await briefHandler(req, res)
        } catch (error) {
          if (res.writableEnded) return
          if (error instanceof SyntaxError) {
            return res.status(400).json({ error: 'Invalid request. Please review the form and try again.' })
          }
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), '')
  for (const key of ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'CONTACT_TO_EMAIL']) {
    if (!process.env[key] && localEnv[key]) process.env[key] = localEnv[key]
  }

  return {
    plugins: [react(), localBriefApi()],
  }
})
