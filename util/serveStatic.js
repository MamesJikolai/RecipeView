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
        console.log(err)
    }
}