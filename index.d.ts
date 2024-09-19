declare module 'hajjtravel-utils' {
    // Add the function and type declarations here
    export function phoneToBackendFormat(phone: string, countryCode?: string): string;
    export function isFileBigger(file: File): boolean;
    export function isImage(file: File): boolean;
    export function objectToPlain(obj: any, parent?: string, result?: any): any;
    export function isEmailAddress(email: string): boolean;
    export function convertToNestedJSON(input: object): object;
}