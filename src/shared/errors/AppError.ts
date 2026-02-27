export class AppError extends Error {
  public readonly code: number;
  public readonly details: string;
  public readonly status: string;

  constructor({
    code = 400,
    details,
    status,
  }: {
    code: number;
    details: string;
    status: string;
  }) {
    super(details);

    this.code = code;
    this.details = details;
    this.status = status;


    Object.setPrototypeOf(this, AppError.prototype)
  }
}
