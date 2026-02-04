export function sendResponse(response, statusCode, contentType, content) {
    response.statusCode = statusCode
    response.setHeader('Content-Type', contentType)
    response.end(content)
}