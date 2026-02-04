import http from 'node:http'
import { serveStatic } from './util/serveStatic.js'

const PORT = 8000

const __dirname =import.meta.dirname

const server = http.createServer(async (request, response) => {
    await serveStatic(request, response, __dirname)
})

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))