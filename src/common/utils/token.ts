import jwt from "jsonwebtoken";
import { IToken } from "../../api/auth/authModel";

export const generateToken = (id: string, email: string) => {
  const token = jwt.sign(
    {
      id,
      email,
    } as IToken,
    process.env.JWT_SECRET || "secret",
    { expiresIn: "60d" }
  );
  return token;
};
