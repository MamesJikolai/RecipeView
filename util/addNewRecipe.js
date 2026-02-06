import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'

export async function addNewRecipe(body) {
    try {
        const data  = await getData()
        const __dirname = import.meta.dirname
        data.push(body)
        const pathJSON = path.join(__dirname, '..', 'data', 'data.json')
        fs.writeFile(pathJSON, JSON.stringify(data, null, 4), 'utf8')
    } catch (err) {
        throw new Error(err)
    }
}