import { UserRoleEnum } from "../../interfaces";
import {
    BadRequestError,
    ConflictError,
    JWTService,
    PasswordHelper,
} from "../../utils";
import { LoginDTO, RegisterUserDTO } from "./user.dto";
import { IUser } from "./user.model";
import { UserRepo } from "./user.repository";

export class UserService {
    constructor(private readonly userRepo: UserRepo) {}

    private async signUserToken(user: IUser) {
        const userInfo: any = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = JWTService.sign(userInfo);

        return {
            ...userInfo,
            accessToken: token,
        };
    }

    async registerUser(data: RegisterUserDTO) {
        const emailExist = await this.userRepo.findByEmail(data.email);

        if (emailExist) {
            throw new ConflictError("Email already exists");
        }

        const hashedPassword = await PasswordHelper.hashPassword(data.password);

        const registeredUser = await this.userRepo.save({
            ...data,
            role: data?.role || UserRoleEnum.USER,
            email: data.email.toLowerCase(),
            password: hashedPassword,
        });

        return this.signUserToken(registeredUser);
    }

    async login(data: LoginDTO) {
        const user = await this.userRepo.findByEmail(data.email);

        const isPasswordCorrect = user
            ? await PasswordHelper.comparePassword(data.password, user.password)
            : null;

        if (!user || !isPasswordCorrect) {
            throw new BadRequestError("Invalid email or password");
        }

        return this.signUserToken(user);
    }
}
