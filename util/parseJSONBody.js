export async function parseJSONBody(request) {
    let body = ''

    for await (const chunk of request) {
        body += chunk
    }

    try {
        console.log(JSON.parse(body))
        return JSON.parse(body)
    } catch (err) {
        throw new Error(`Invalid JSON format: ${err}`)
    }
}