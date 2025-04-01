import * as bcrypt from "bcryptjs";

export class PasswordHelper {
    static hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    static comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}
