import { getData } from '../util/getData.js'
import { sendResponse } from '../util/sendResponse.js'

// handleGet
export async function handleGet(response) {
    const data = JSON.stringify(await getData())
    sendResponse(response, 200, 'application/json', data)
}

// handlePost