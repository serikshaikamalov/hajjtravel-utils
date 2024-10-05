declare module 'hajjtravel-utils' {
    // Add the function and type declarations here
    export function phoneToBackendFormat(phone: string, countryCode?: string): string;
    export function isFileBigger(file: File): boolean;
    export function isImage(file: File): boolean;
    export function objectToPlain(obj: any, parent?: string, result?: any): any;
    export function isEmailAddress(email: string): boolean;
    export function convertToNestedJSON(input: object): object;
    export function updateForm(fields: any[], key: string, property: string, value: any): any[];
    export function toPlainPhoneNumber(phone: string): string;
    export function phoneToUI(phone: string, mask: string): string;
    export function groupBy(arr: any[], key: string): Object;
    export function sleep(duration: number): Promise<any>;
}
