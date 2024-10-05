interface LoggerOptions {
    requestId: string;   // Optional request ID
    namespace: string;   // Optional namespace
    isLocal: boolean;    // Flag to indicate if running locally
    apiKey: string;      // API key for authentication
    service: string;     // Name of the service
}

declare class LoggerBaselime {
    messages: any[];  // Array to hold log messages
    options: LoggerOptions;  // Options for the logger

    /**
     * Creates an instance of LoggerBaselime.
     * @param options Options for the logger.
     */
    constructor(options: LoggerOptions);

    /**
     * Logs a message.
     * @param message The message to log.
     */
    log(message: any): void;

    /**
     * Sends logged messages to an external service.
     * @returns A promise that resolves when messages are sent.
     */
    send(): Promise<void>;
}

export { LoggerBaselime, LoggerOptions };