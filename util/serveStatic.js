import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(request, response, baseDir) {
    const publicDir = path.join(baseDir, 'public')
    const filePath = path.join(
        publicDir, 
        request.url === '/' ? 'index.html' : request.url
    )
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)
    
    try {
        const content = await fs.readFile(filePath)
        sendResponse(response, 200, contentType, content)
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            sendResponse(response, 404, 'text/plain', '404: File Not Found')
        } else {
            console.error("Server Error", err)
            sendResponse(response, 500, 'text/plain', '500: Internal Server Error')
        }
    }
}