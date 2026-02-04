import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = import.meta.dirname;

export async function getData() {
    try {
        const pathJSON = path.join(__dirname, '..', 'data', 'data.json')
        const data = await fs.readFile(pathJSON, 'utf8')
        const parsedData = JSON.parse(data)
        return parsedData
    } catch (err) {
        console.log(err)
        return []
    }
}
