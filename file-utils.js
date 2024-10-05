/**
 * @description converts file instance to Buffer format
 * @param fileInput 
 * @returns 
 */
export async function fileToBuffer(fileInput) {
    if (fileInput instanceof File) {
        const arrayBuffer = await fileInput.arrayBuffer()
        const fileBuffer = Buffer.from(arrayBuffer)
        return fileBuffer
    } else {
        throw new Error('Wrong fileInput type: Should be File type')
    }
}