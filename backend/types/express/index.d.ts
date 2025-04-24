declare namespace Express {
  export interface User {
    userId: number;
    username: string;
  }

  export interface Request {
    session?: any;
    token?: string;
    tokenId?: number;
    user?: any;
  }
}
