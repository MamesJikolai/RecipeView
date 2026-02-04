import http from 'node:http'
import { serveStatic } from './util/serveStatic.js'
import { handleGet } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname =import.meta.dirname

const server = http.createServer(async (request, response) => {
    if (request.url === '/api' && request.method === 'GET') {
        return await handleGet(response)
    } else if (!request.url.startsWith('/api')) {
        return await serveStatic(request, response, __dirname)
    }
})

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))