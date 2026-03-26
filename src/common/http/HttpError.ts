export class HttpError extends Error {
  public response: {
    status: number;
    data: any;
  };

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'HttpError';
    this.response = {
      status,
      data
    };
  }
}
