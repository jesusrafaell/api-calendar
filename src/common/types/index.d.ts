import { IToken } from "../../api/auth/authModel";

declare global {
  namespace Express {
    interface Request {
      user: IToken;
    }
  }
}
