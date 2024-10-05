declare module 'hajjtravel-utils/file-utils' {
    // Add the function and type declarations here
    export function fileToBlob(fileInput: File): Promise<Buffer>;
}
