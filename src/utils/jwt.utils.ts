import jwt, { SignOptions } from "jsonwebtoken";
import { serverEnv } from "../config";
import { ForbiddenError } from "./error.utils";

export class JWTService {
    static sign(payload: object): string {
        return jwt.sign(payload, serverEnv.JWT_SECRET, { expiresIn: "1hr" });
    }

    static verify(token: string) {
        try {
            return jwt.verify(token, serverEnv.JWT_SECRET as string);
        } catch (err) {
            throw new ForbiddenError("Invalid token");
        }
    }
}
