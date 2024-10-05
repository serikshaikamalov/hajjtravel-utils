declare class FirebaseStorageService {
    _bucket: any;

    /**
     * Creates an instance of FirebaseStorageService.
     * @param bucket Firebase bucket instance.
     */
    constructor(bucket: any);

    /**
     * Uploads a file to Firebase Storage.
     * @param fileInput The file to upload.
     * @param fileName The name of the file in storage.
     * @returns A promise that resolves with the path to the saved file.
     * @throws Will throw an error if the file cannot be uploaded.
     */
    upload(fileInput: File, fileName: string): Promise<string>;
}

export { FirebaseStorageService };
