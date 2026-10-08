export class AppError extends Error {
    status;
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}
