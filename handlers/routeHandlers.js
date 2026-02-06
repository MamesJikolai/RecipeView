import { getData } from '../util/getData.js'
import { sendResponse } from '../util/sendResponse.js'
import { parseJSONBody } from '../util/parseJSONBody.js'
import { addNewRecipe } from '../util/addNewRecipe.js'
import { sanitizeInput } from '../util/sanitizeInput.js'

// handleGet
export async function handleGet(response) {
    const data = JSON.stringify(await getData())
    sendResponse(response, 200, 'application/json', data)
}

// handlePost
export async function handlePost(request, response) {
    try {
        console.log("Post request received")
        const parsedBody = await parseJSONBody(request)
        const sanitizedBody = sanitizeInput(parsedBody)
        console.log(sanitizedBody)
        await addNewRecipe(sanitizedBody)
        sendResponse(response, 201, 'application/json', JSON.stringify(sanitizedBody))
    } catch (err) {
        sendResponse(response, 400, 'application/json', JSON.stringify({error: err}))
    }
}