import { Model } from "mongoose";
import { User, IUser } from "./user.model";
import { BaseRepository } from "../../database";

export class UserRepo extends BaseRepository<IUser> {
    constructor(repository: Model<IUser> = User) {
        super(repository);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.findOne({ email: email.toLowerCase() });
    }
}
