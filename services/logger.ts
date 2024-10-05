export class LoggerBaselime {
    messages: any[] = []
    options: any = {}
    constructor(options) {
        this.options = options
    }

    log(message: any) {
        this.messages.push(message)
        console.log("messages:", this.messages);
    }

    async send() {
        console.log("Logger: send", this.messages)
        this.messages = this.messages.map(m => {
            return {
                message: m?.message,
                requestId: this.options.requestId,
                namespace: this.options.namespace,
                data: m?.data || {}
            }
        })

        if (!this.options.isLocal) {
            await fetch('https://events.baselime.io/v1/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.options.apiKey,
                    'x-service': this.options.service,
                },
                body: JSON.stringify(this.messages),
            })
        }
    }
}