import fs from 'fs'
import { resolve } from 'path'

interface I_DeleteFile {
    folder: string
    filename: string
}
export const deleteFile = async ({ folder, filename }: I_DeleteFile) => {
    const file = resolve(__dirname, '..', '..', 'tmp', folder, filename)
    try {
        await fs.promises.stat(file)
    } catch (error) {
        console.log(error)
        return;
    }
    await fs.promises.unlink(file)
}