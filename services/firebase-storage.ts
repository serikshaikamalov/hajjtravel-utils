import { fileToBuffer } from "hajjtravel-utils/file-utils";

/**
 * Used to upload files to Firebase Storage. 
 * required _bucket - Fireabase bucket instance
 */
export class FirebaseStorageService {
    // Firebase backet instance
    _bucket: any;
    constructor(bucket: any) {
        this._bucket = bucket
    }

    /**
     * @return a path to a saved file
     * @param fileInput 
     * @param path - a path to file 
     * @returns 
     */
    async upload(fileInput: File, path: string): Promise<string> {
        console.log("Upload:", { fileInput, path });
        console.log('fileInput instanceOf File:', fileInput instanceof File)
        if (!this._bucket) {
            throw new Error('No bucket provided')
        }

        try {
            if (!fileInput) {
                throw new Error('File not found!')
            }

            if (fileInput instanceof File) {
                const [_, ext] = String(fileInput.type).split('/')
                const fileName = `${path}/${new Date().getTime()}.${ext}`

                const fileBuffer = await fileToBuffer(fileInput)
                const fileRef = this._bucket.file(fileName)

                // Upload the blob data
                await fileRef.save(fileBuffer, {
                    metadata: {
                        contentType: 'application/octet-stream'
                    }
                })

                console.log(`${fileName} uploaded successfully!`);
                return fileName
            } else {
                throw new Error('fileInput is not fype File')
            }
        } catch (ex: any) {
            console.error('Error uploading file:', ex);
            throw new Error(`'Error uploading file: ${ex.message}`)
        }
    }
}
